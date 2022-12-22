import { Component, Input, OnInit } from '@angular/core';
import { Tithe } from 'src/app/models/tithe';
import { FinancySummary } from 'src/app/models/fianancySummary';
import { TitheSummary } from 'src/app/models/tithesummary';
import { CustomizedMonth } from 'src/app/models/customizedMonth';

@Component({
  selector: 'app-tithe-summary',
  templateUrl: './tithe-summary.component.html',
  styleUrls: ['./tithe-summary.component.scss'],
})
export class TitheSummaryComponent implements OnInit {
  @Input() titheSummary: TitheSummary;
  @Input() isTithe: boolean;
  headTitheList: string[] = ['Registrado por', 'Período'];
  constructor() {}

  ngOnInit() {}

  setShowSummaryDetail() {
    console.log(this.titheSummary);
    this.titheSummary.showDetails = !this.titheSummary.showDetails;
  }

  setShowTitheDetail(tithe: Tithe) {
    const tithePosition = this.titheSummary.tithes.indexOf(tithe);
    this.titheSummary.tithes[tithePosition].showDetails =
      !this.titheSummary.tithes[tithePosition].showDetails;
  }
}
