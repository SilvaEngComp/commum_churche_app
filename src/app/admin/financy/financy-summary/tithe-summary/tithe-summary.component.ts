import { Component, Input, OnInit } from '@angular/core';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { Tithe } from 'src/app/models/tithe';
import { TitheSummary } from 'src/app/models/tithesummary';

@Component({
  selector: 'app-tithe-summary',
  templateUrl: './tithe-summary.component.html',
  styleUrls: ['./tithe-summary.component.scss'],
})
export class TitheSummaryComponent implements OnInit {
  @Input() titheSummary: TitheSummary;
  @Input() isTithe: boolean;
  headTitheList: string[] = ['valor', 'data', 'Registrado por'];
  constructor() {}

  ngOnInit() {
    if (this.isTithe) {
      this.headTitheList.push('Dizimista');
    } else {
      this.headTitheList.push('Ofertante');
    }
  }

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
