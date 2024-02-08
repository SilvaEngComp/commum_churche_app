import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { SummaryOutput } from 'src/app/models/sumaryOutput';
import { TotalInputOutput } from 'src/app/models/totalInputOutput';
import { FinancyService } from 'src/app/services/financy-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-outputs-graph',
  templateUrl: './outputs-graph.component.html',
  styleUrls: ['./outputs-graph.component.scss'],
})
export class OutputsGraphComponent implements OnInit {
  canvasGraph: HTMLElement;
  caixaReport: SummaryOutput;
  graphicMonth: any;
  filter: FinancySummaryFilter;
  constructor(private financyService: FinancyService) {}

  ngOnInit() {
    UiService.graphGenerator.subscribe(() => {
      this.load();
    });
  }
  save() {
    UiService.localSet(Constants.FINANCY_REPORT_OUTPUT, this.caixaReport);
  }
  load() {
    this.filter = UiService.localGet(Constants.FINANCY_REPORT_FILTER);

    this.financyService
      .getOutputs(this.filter)
      .then((response) => {
        this.caixaReport = response.data;
        this.save();

        this.graphGenerator();
      })
      .catch((error) => console.log(error));
  }

  graphGenerator() {
    const total = [];
    const labels = [];
    this.caixaReport.reports.filter((summary) => {
      total.push(summary?.caixaReport?.caixaReportCategory?.total);
      labels.push(summary?.church?.name);
    });

    const generallabel = 'Resumo de Entradas Por Organização';
    if (this.graphicMonth) {
      this.graphicMonth.destroy();
    }

    if (!this.canvasGraph) {
      this.canvasGraph = document.getElementById('outputCanvasGraph');
    }
    this.graphicMonth = UiService.buildChartMonth(
      this.canvasGraph,
      'doughnut',
      labels,
      total,
      '',
      null,
      generallabel
    );
  }
}
