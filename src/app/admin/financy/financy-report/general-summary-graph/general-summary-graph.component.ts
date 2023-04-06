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
import { ModalController, IonPopover } from '@ionic/angular';
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
  selector: 'app-general-summary-graph',
  templateUrl: './general-summary-graph.component.html',
  styleUrls: ['./general-summary-graph.component.scss'],
})
export class GeneralSummaryComponent implements OnInit {
  canvasGraph: HTMLElement;

  graphicMonth: any;

  filter: FinancySummaryFilter;
  totalInputOutput: TotalInputOutput;
  balance: number;
  constructor(
    private financyService: FinancyService,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {
    UiService.graphGenerator.subscribe(() => {
      this.filter = UiService.localGet(Constants.FINANCY_REPORT_FILTER);
      this.load();
    });
  }

  async download() {
    // this.exceptionService.loadingFunction('Processando Tabela Excel...');
    this.downloadService.buildFinancialReport('Relatório Financeiro');
  }

  async load() {
    this.filter = UiService.localGet(Constants.FINANCY_REPORT_FILTER);

    this.financyService
      .getTotalInputOutput(this.filter)
      .then((response) => {
        this.totalInputOutput = response.data;
        this.balance =
          this.totalInputOutput.totalInput - this.totalInputOutput.totalOutput;
        this.save();
        this.graphGenerator();
      })
      .catch((error) => console.log(error));
  }
  save() {
    UiService.localSet(Constants.FINANCY_REPORT_GENERAL, this.totalInputOutput);
  }

  graphGenerator() {
    const total = [
      this.totalInputOutput.totalInput,
      this.totalInputOutput.totalOutput,
      this.balance,
    ];
    const labels = ['Entrada', 'Saída', 'Saldo'];

    const generallabel = 'Resumo de Entradas e Saídas';
    if (this.graphicMonth) {
      this.graphicMonth.destroy();
    }

    if (!this.canvasGraph) {
      this.canvasGraph = document.getElementById('generalCanvasGraph');
    }

    this.graphicMonth = UiService.buildChartMonth(
      this.canvasGraph,
      'bar',
      labels,
      total,
      [generallabel]
    );
  }
}
