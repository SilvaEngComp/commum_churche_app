/* eslint-disable @typescript-eslint/member-ordering */
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonPopover } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { ConstantMessages } from 'src/app/models/messages';
import { TotalInputOutput } from 'src/app/models/totalInputOutput';
import { Wallet } from 'src/app/models/wallet';
import { DownloadService } from 'src/app/services/download.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-financy-report',
  templateUrl: './financy-report.component.html',
  styleUrls: ['./financy-report.component.scss'],
})
export class FinancyReportComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasTotalSummary', { static: false })
  canvasTotalSummary: HTMLElement;

  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();
  graphicMonth: any;
  graphicYear: any;
  constructor(
    private exceptionService: ExceptionService,
    private downloadService: DownloadService
  ) {}
  ngAfterViewInit(): void {
    this.checkFilter();
    this.emitEvent();
  }

  filter: FinancySummaryFilter;
  totalInputOutput: TotalInputOutput;
  month: string;
  year: string;

  initialDate: string;
  endDate: string;

  wallet: Wallet;

  customMonth: any = {
    header: 'Escolha um Mês',
  };

  ngOnInit() {
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_SUMMARY
    );
    UiService.subPageTitle.emit(Constants.TITLE_SUMMARY_FINANCY_REPORT);
  }

  async download() {
    this.exceptionService.loadingFunction('Processando Tabela Excel...');
    this.downloadService.buildFinancialReport('Relatório Financeiro');
  }

  checkFilter() {
    this.filter = UiService.localGet(Constants.FINANCY_REPORT_FILTER);
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
  emitEvent() {
    this.saveFilter();
    UiService.graphGenerator.emit();
  }

  isValidFilter() {
    if (!this.filter?.dateI || !this.filter?.dateF) {
      this.exceptionService.alertDialog(
        ConstantMessages.INVALIDE_DATE_INTERVAL,
        'Alerta'
      );
      return false;
    }
    if (!this.filter?.wallet_id) {
      this.exceptionService.alertDialog(
        ConstantMessages.INVALID_WALLET,
        'Alerta'
      );
      return false;
    }
    return true;
  }

  saveFilter() {
    UiService.localSet(Constants.FINANCY_REPORT_FILTER, this.filter);
  }

  selectDateInterval(popover: IonPopover) {
    popover?.dismiss();
    this.saveFilter();
    this.emitEvent();
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
      this.emitEvent();
      UiService.localSet(Constants.CAIXA_WALLET, this.wallet);
    } else {
      this.wallet = null;
      UiService.localRemove(Constants.CAIXA_WALLET);
    }
    this.saveFilter();
  }
}
