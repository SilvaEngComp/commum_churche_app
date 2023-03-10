import { TitheReport } from './../../../../models/sumaryInput';
import { Component, Input, OnInit } from '@angular/core';
import { Tithe } from 'src/app/models/tithe';
import { TitheFacade } from 'src/app/facades/tithe-facade.service';

@Component({
  selector: 'app-tithe-summary',
  templateUrl: './tithe-summary.component.html',
  styleUrls: ['./tithe-summary.component.scss'],
})
export class TitheSummaryComponent implements OnInit {
  @Input() titheReport: TitheReport;
  @Input() isTithe: boolean;
  headTitheList: string[] = ['valor', 'data', 'Registrado por'];
  constructor(private titheFacade: TitheFacade) {}

  ngOnInit() {
    if (this.isTithe) {
      this.headTitheList.push('Dizimista');
    } else {
      this.headTitheList.push('Ofertante');
    }
    this.headTitheList.push('');
  }

  setShowSummaryDetail() {
    this.titheReport.showDetails = !this.titheReport.showDetails;
  }

  setShowTitheDetail(tithe: Tithe) {
    const tithePosition = this.titheReport.titheSummary.tithes.indexOf(tithe);
    this.titheReport.titheSummary.tithes[tithePosition].showDetails =
      !this.titheReport.titheSummary.tithes[tithePosition].showDetails;
  }

  delete(tithe: Tithe) {
    this.titheFacade.delete(tithe);
  }
}
