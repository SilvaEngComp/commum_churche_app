import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { SummaryInput } from 'src/app/models/sumaryInput';
import { TotalInputOutput } from 'src/app/models/totalInputOutput';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FinancyService } from 'src/app/services/financy-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-inputs-graph',
  templateUrl: './inputs-graph.component.html',
  styleUrls: ['./inputs-graph.component.scss'],
})
export class InputsGraphComponent implements OnInit {
  canvasGraph: HTMLElement;

  graphicMonth: any;
  summaryinput: SummaryInput;
  filter: FinancySummaryFilter;
  constructor(
    private financyService: FinancyService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    UiService.graphGenerator.subscribe(() => {
      this.load();
    });
  }

  save() {
    UiService.localSet(Constants.FINANCY_REPORT_INPUT, this.summaryinput);
  }

  load() {
    this.filter = UiService.localGet(Constants.FINANCY_REPORT_FILTER);
    this.financyService
      .getInputs(this.filter)
      .then((response) => {
        this.summaryinput = response.data;
        this.save();

        this.graphGenerator();
      })
      .catch((error) => this.exceptionService.error(error));
  }

  graphGenerator() {
    const total = [];
    const labels = [];
    this.summaryinput.reports.filter((summary) => {
      total.push(summary?.total);
      labels.push(summary?.church?.name);
    });

    const generallabel = 'Resumo de Entradas Por Organização';
    if (this.graphicMonth) {
      this.graphicMonth.destroy();
    }

    if (!this.canvasGraph) {
      this.canvasGraph = document.getElementById('inputsCanvasGraph');
    }
    this.graphicMonth = UiService.buildChartMonth(
      this.canvasGraph,
      'doughnut',
      labels,
      total,
      [generallabel]
    );
  }
}
