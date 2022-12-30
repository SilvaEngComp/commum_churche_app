import { MenuCaixaSummaryComponent } from './../menu-caixa-summary/menu-caixa-summary.component';
import { PopoverController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { CaixaFacadeService } from 'src/app/facades/caixa-facade.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Caixa } from 'src/app/models/caixa';
import { CaixaSummary } from 'src/app/models/caixaSummary';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa-summary',
  templateUrl: './caixa-summary.component.html',
  styleUrls: ['./caixa-summary.component.scss'],
})
export class CaixaSummaryComponent implements OnInit {
  @Output() mantainceEmiter: EventEmitter<any> = new EventEmitter<any>();
  @Input() caixaSummary: CaixaSummary;
  @Input() isEntry: boolean;
  headCaixaList: string[] = [
    'Tipo',
    'Valor',
    'Data',
    'Registrado por',
    'Organização',
    'Motivo',
  ];
  total: number;
  constructor(
    private caixaFacade: CaixaFacadeService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.caixaFacade.dataLoaded.subscribe((data) => {
      console.log('emiting request to reload');
      this.mantainceEmiter.emit();
    });
    this.total = 0;
    this.caixaSummary?.caixas?.filter((caixaSummary) => {
      this.total += caixaSummary?.amount;
    });
  }

  setShowSummaryDetail(caixa: CaixaSummary) {
    this.caixaSummary.showDetails = !this.caixaSummary.showDetails;
  }

  setShowCaixaDetail(caixa: Caixa, caixaSummary: CaixaSummary) {
    const caixaPosition = this.caixaSummary.caixas.indexOf(caixa);
    this.caixaSummary.caixas[caixaPosition].showDetails =
      !this.caixaSummary.caixas[caixaPosition].showDetails;
  }

  async edit(caixa: Caixa) {
    UiService.localSet(Constants.CAIXA_MAINTAINCE, caixa);

    UiService.caixaAdminEmitter.emit(
      Constants.MENU_FINANCY_OPTION_CAIXA_REGISTER
    );
  }
  delete(caixa: Caixa) {
    this.caixaFacade.delete(caixa);
  }

  async openMenuOption(ev: any, caixa: Caixa) {
    const pop = await this.popCtrl.create({
      component: MenuCaixaSummaryComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onWillDismiss();

    if (data?.option === Constants.OPTION_EDIT) {
      this.edit(caixa);
    } else {
      this.delete(caixa);
    }
  }
}
