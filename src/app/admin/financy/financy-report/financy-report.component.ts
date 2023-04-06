/* eslint-disable @typescript-eslint/member-ordering */
import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonPopover, ModalController } from '@ionic/angular';
import { CaixaSummary } from 'src/app/models/caixaSummary';
import { Constants } from 'src/app/models/constants';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { ConstantMessages } from 'src/app/models/messages';
import { TitheSummary } from 'src/app/models/titheSummary';
import { TotalInputOutput } from 'src/app/models/totalInputOutput';
import { Wallet } from 'src/app/models/wallet';
import { CurrencyBrlPipe } from 'src/app/pipes/currency-brl.pipe';
import { DownloadService } from 'src/app/services/download.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FinancyService } from 'src/app/services/financy-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-financy-report',
  templateUrl: './financy-report.component.html',
  styleUrls: ['./financy-report.component.scss'],
})
export class FinancyReportComponent implements OnInit {
  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('canvasMnth', { static: false }) canvasMnth: ElementRef;
  @ViewChild('canvasYear', { static: false }) canvasYear: ElementRef;
  graphicMonth: any;
  graphicYear: any;
  constructor(
    private financyService: FinancyService,
    private modalController: ModalController,
    private exeptionService: ExceptionService,
    private downloadService: DownloadService
  ) {}

  header: string[] = [
    'Vendedor',
    'Meta',
    'Total Dinheiro',
    'Total Cartão',
    'Total Crediário',
    'Total Vendido',
  ];

  selectedGraficTypeCustomizedMonth: string;
  selectedGraficTypeAno: string;

  filter: FinancySummaryFilter;
  totalInputOutput: TotalInputOutput;
  month: string;
  year: string;
  // caixaSummary: CaixaSummary;
  inputSummary: CaixaSummary;
  outputSummary: CaixaSummary;
  titheSummary: TitheSummary;
  offerSummary: TitheSummary;
  initialDate: string;
  endDate: string;
  showCaixaOutputDetail: boolean;
  showCaixaInputDetail: boolean;
  showTitheDetail: boolean;
  showOfferDetail: boolean;
  showInputsDetail: boolean;
  customizedMonth: CustomizedMonth;

  localPageTitle: string;
  balance: number;
  wallet: Wallet;

  customMonth: any = {
    header: 'Escolha um Mês',
  };

  mes: CustomizedMonth;
  ano: number;
  meses: CustomizedMonth[];
  loaded: boolean;

  ngOnInit() {
    this.mes = new CustomizedMonth();
    this.ano = new Date().getFullYear();
    this.meses = CustomizedMonth.getMonths();
    this.localPageTitle = Constants.TITLE_SUMMARY_FINANCY_REPORT;
    this.checkFilter();
    this.load();
    // this.graficoAnual();
  }

  async download() {
    // this.exceptionService.loadingFunction('Processando Tabela Excel...');
    this.downloadService.buildFinancialReport([], 'Relatório Financeiro');
  }

  back() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_SUMMARY);
  }

  checkFilter() {
    this.filter = UiService.localGet(Constants.FINANCY_SUMMARY_FILTER);
    if (!this.filter) {
      this.filter = new FinancySummaryFilter();

      const datePipe = new DatePipe('en');
      const date = new Date();
      const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
      const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.initialDate = datePipe.transform(primeiroDia, 'YYYY-MM-dd');
      this.endDate = datePipe.transform(ultimoDia, 'YYYY-MM-dd');
      this.wallet = UiService.localGet(Constants.CAIXA_WALLET);
      UiService.mySelectEmitter.emit({ obj: this.wallet, listName: 'wallets' });

      this.filter.dateI = this.initialDate;
      this.filter.dateF = this.endDate;

      if (this?.wallet) {
        this.filter.wallet_id = this?.wallet?.id;
      } else {
        this.filter.wallet_id = Constants.WALLET_FLUX_ID;
      }
    } else {
      this.initialDate = this.filter.dateI;
      this.endDate = this.filter.dateF;
    }
  }

  async load() {
    if (this.isValidFilter()) {
      this.financyService
        .getTotalInputOutput(this.filter)
        .then((response) => {
          this.totalInputOutput = response.data;
          this.balance =
            this.totalInputOutput.totalInput -
            this.totalInputOutput.totalOutput;
          this.inputOutputSumaryGraph();
        })
        .catch((error) => console.log(error));
    }
  }

  isValidFilter() {
    if (!this.filter?.dateI || !this.filter?.dateF) {
      this.exeptionService.alertDialog(
        ConstantMessages.INVALIDE_DATE_INTERVAL,
        'Alerta'
      );
      return false;
    }
    if (!this.filter?.wallet_id) {
      this.exeptionService.alertDialog(
        ConstantMessages.INVALID_WALLET,
        'Alerta'
      );
      return false;
    }
    return true;
  }

  saveFilter() {
    UiService.localSet(Constants.FINANCY_SUMMARY_FILTER, this.filter);
  }

  receiveMantainceEmiter(ev: any) {
    this.load();
  }

  selectDateInterval(popover: IonPopover) {
    popover?.dismiss();
    this.saveFilter();
    this.load();
  }

  setIntialDate(date: any) {
    this.initialDate = date.substring(0, 10);
    this.filter.dateI = this.initialDate;
  }
  setEndDate(date: any) {
    this.endDate = date.substring(0, 10);
    this.filter.dateF = this.endDate;
  }

  setWallet(wallet: Wallet) {
    if (wallet) {
      this.wallet = wallet;
      this.filter.wallet_id = this.wallet.id;
      this.load();
      UiService.localSet(Constants.CAIXA_WALLET, this.wallet);
    } else {
      this.wallet = null;
      UiService.localRemove(Constants.CAIXA_WALLET);
    }
    this.saveFilter();
  }
  inputOutputSumaryGraph() {
    const total = [
      this.totalInputOutput.totalInput,
      this.totalInputOutput.totalOutput,
    ];
    const labels = ['Entrada', 'Saída'];
    const totalvalue = this.balance;

    const pipe = new CurrencyBrlPipe();

    const generallabel = 'Resumo de Entradas e Saídas';
    this.loaded = true;
    if (this.graphicMonth) {
      this.graphicMonth.destroy();
    }
    this.graphicMonth = UiService.buildChartMonth(
      this.canvasMnth.nativeElement,
      'bar',
      labels,
      total,
      [generallabel]
    );
  }

  // async graficoAnual() {
  //   const relatorios = await this.SaleReportService.yearReport(this.ano);

  //   const labels = [];
  //   const dates = [[], []];
  //   let i = 0;
  //   let volume = 0;
  //   let total = 0;
  //   let goal = 0;
  //   relatorios.filter((relatorio) => {
  //     volume += relatorio.quantity;
  //     total += Number(relatorio.total);
  //     goal = relatorio.goal;
  //     console.log(relatorio.quantity);
  //     labels.push(this.meses[i].name);
  //     dates[0].push(relatorio.total);
  //     dates[1].push(relatorio.goal);
  //     i++;
  //   });
  //   console.log(volume / relatorios.length);

  //   if (this.graphicYear) {
  //     this.graphicYear.destroy();
  //   }

  //   const labels2 = [];
  //   const pipe = new CurrencyBrlPipe();
  //   labels2.push(volume + ' vendas' + ' | Total: R$ ' + pipe.transform(total));
  //   labels2.push('Meta Mensal: ' + goal);

  //   this.graphicYear = UiService.buildChartYear(
  //     this.canvasYear.nativeElement,
  //     'line',
  //     labels,
  //     dates,
  //     labels2
  //   );
  //   this.loaded = true;
  // }

  onChartClick(ev: any) {}
}
