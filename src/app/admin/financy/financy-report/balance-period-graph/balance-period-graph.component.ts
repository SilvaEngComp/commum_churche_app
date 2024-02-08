import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { GraphData } from 'src/app/models/graphData';
import { DownloadService } from 'src/app/services/download.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FinancyGraphServiceService } from 'src/app/services/financy-graph-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-balance-period-graph',
  templateUrl: './balance-period-graph.component.html',
  styleUrls: ['./balance-period-graph.component.scss'],
})
export class BalancePeriodGraphComponent implements OnInit {
  canvasGraph: HTMLElement;

  graphicMonth: any;

  filter: FinancySummaryFilter;
  resultDataGrath: GraphData;
  constructor(
    private financyService: FinancyGraphServiceService,
    private downloadService: DownloadService,
    private exeptionService: ExceptionService
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
      .getPeriodBalance(this.filter)
      .then((response) => {
        this.resultDataGrath = response.data;
      })
      .catch((error) => this.exeptionService.error(error))
      .finally(() => this.graphGenerator());
  }

  graphGenerator() {
    if (this.resultDataGrath) {
      const labels = this.resultDataGrath.labels;
      const data = [
        {
          label: 'Entradas',
          data: this.resultDataGrath?.values[0],
          borderColor: '#191970',
          backgroundColor: '#191970',
        },
        {
          label: 'Saídas',
          data: this.resultDataGrath?.values[1],
          borderColor: '#FF0000',
          backgroundColor: '#FF0000',
        },
      ];

      const generallabel = 'Balanço por período';
      if (this.graphicMonth) {
        this.graphicMonth.destroy();
      }

      if (!this.canvasGraph) {
        this.canvasGraph = document.getElementById('balancePeriodCanvasGraph');
      }

      this.graphicMonth = UiService.buildChartMonth(
        this.canvasGraph,
        'line',
        labels,
        data,
        '',
        data,
        'Balanço por Período'
      );
    }
  }
}
