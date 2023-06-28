import { TitheReport } from './../../../../models/sumaryInput';
import { Component, Input, OnInit } from '@angular/core';
import { Tithe } from 'src/app/models/tithe';
import { TitheFacade } from 'src/app/facades/tithe-facade.service';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tithe-summary',
  templateUrl: './tithe-summary.component.html',
  styleUrls: ['./tithe-summary.component.scss'],
})
export class TitheSummaryComponent implements OnInit {
  @Input() titheReport: TitheReport;
  @Input() isTithe: boolean;
  headTitheList: string[] = ['valor', 'Data', 'Tesoureiro'];
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

  edit(tithe: Tithe) {
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_BALANCE
    );
    UiService.localSet(Constants.TITHE_MAINTAINCE, tithe);

    UiService.caixaAdminEmitter.emit(
      Constants.MENU_FINANCY_OPTION_TITHE_REGISTER
    );
  }

  delete(tithe: Tithe) {
    this.titheFacade.delete(tithe);
  }
}
