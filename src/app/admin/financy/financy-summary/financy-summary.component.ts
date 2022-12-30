import { MenuSummaryComponent } from './menu-summary/menu-summary.component';
import { UiService } from 'src/app/services/ui.service';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CaixaFacadeService } from 'src/app/facades/caixa-facade.service';
import { Caixa } from 'src/app/models/caixa';
import { FinancySummary } from 'src/app/models/fianancySummary';
import { Constants } from 'src/app/models/constants';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FinancyService } from 'src/app/services/financy-service.service';
import { FilterCaixaComponent } from '../caixa/filter-caixa/filter-caixa.component';
import { TitheSummary } from 'src/app/models/tithesummary';
import { CaixaSummary } from 'src/app/models/caixaSummary';

@Component({
  selector: 'app-report',
  templateUrl: './financy-summary.component.html',
  styleUrls: ['./financy-summary.component.scss'],
})
export class ReportComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  filter: FinancySummaryFilter;
  sumary: FinancySummary;
  month: string;
  year: string;
  // caixaSummary: CaixaSummary;
  inputSummary: CaixaSummary;
  outputSummary: CaixaSummary;
  titheSummary: TitheSummary;
  offerSummary: TitheSummary;
  initialDate: string;
  endDate: string;
  showCaixaOutputDetail: boolean;
  showCaixaInputDetail: boolean;
  showTitheDetail: boolean;
  showOfferDetail: boolean;
  showInputsDetail: boolean;
  customizedMonth: CustomizedMonth;
  noContent = 'Nenhum Registro';
  constructor(
    private financyService: FinancyService,
    private caixaFacade: CaixaFacadeService,
    private modalController: ModalController,
    private popCtrl: PopoverController,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    // this.filter = UiService.localGet(Constants.FINANCY_SUMMARY_FILTER);
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_SUMMARY_FINANCY
    );
    UiService.pageTitle.emit(Constants.TITLE_SUMMARY_FINANCY);
    this.filter = new FinancySummaryFilter();
    const datePipe = new DatePipe('en');
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.initialDate = datePipe.transform(primeiroDia, 'YYYY-MM-dd');
    this.endDate = datePipe.transform(ultimoDia, 'YYYY-MM-dd');

    this.filter.dateI = this.initialDate;
    this.filter.dateF = this.endDate;

    this.load();
  }

  saveFilter() {
    UiService.localSet(Constants.FINANCY_SUMMARY_FILTER, this.filter);
  }

  receiveMantainceEmiter(ev: any) {
    this.load();
  }

  async load() {
    if (!this.filter?.dateI || !this.filter?.dateF) {
      this.exeptionService.alertDialog(
        'Selecione a data de inicio e fim da consulta',
        'Alerta'
      );
    }
    this.financyService.caixaSummary(this.filter).then((response) => {
      this.sumary = response.data;
      console.log(response);
      this.inputSummary = new CaixaSummary();
      this.outputSummary = new CaixaSummary();
      this.titheSummary = new TitheSummary();
      this.offerSummary = new TitheSummary();
      this.sumary.caixaSummary?.input?.filter((caixaSummary) => {
        if (caixaSummary?.isEntry) {
          this.inputSummary.total += caixaSummary?.total;
        }
      });
      this.sumary.caixaSummary?.output?.filter((caixaSummary) => {
        if (!caixaSummary?.isEntry) {
          this.outputSummary.total += caixaSummary?.total;
        }
      });

      this.titheSummary = this.sumary.titheSummary?.tithe;

      this.titheSummary?.tithes.filter((tithe) => {
        tithe.customizedMonth = new CustomizedMonth(Number(tithe.month));
      });

      this.offerSummary = this.sumary.titheSummary?.offer;

      this.offerSummary?.tithes.filter((tithe) => {
        tithe.customizedMonth = new CustomizedMonth(Number(tithe.month));
      });
    });
  }

  setShowCaixaOutputDetail() {
    this.showCaixaOutputDetail = !this.showCaixaOutputDetail;
  }
  setShowCaixaInputDetail() {
    this.showCaixaInputDetail = !this.showCaixaInputDetail;
  }
  setShowTitheDetail() {
    this.showTitheDetail = !this.showTitheDetail;
  }
  setShowOfferDetail() {
    this.showOfferDetail = !this.showOfferDetail;
  }

  setShowInputsDetail() {
    this.showInputsDetail = !this.showInputsDetail;
  }
  showMoreCaixaSummary(caixa: CaixaSummary) {}

  async newCaixa(op: boolean) {
    UiService.localRemove(Constants.CAIXA_MAINTAINCE);

    UiService.localSet(Constants.IS_ENTRY, op);
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_SUMMARY
    );
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_CAIXA_REGISTER);
  }
  async newTithe(op: boolean) {
    UiService.localRemove(Constants.TITHE_MAINTAINCE);
    UiService.localSet(Constants.IS_TITHE, op);
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_SUMMARY
    );
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_TITHE_REGISTER);
  }

  delete(caixa: Caixa) {
    this.caixaFacade.delete(caixa);
  }

  setIntialDate(date: any) {
    this.initialDate = date.substring(0, 10);
    this.filter.dateI = this.initialDate;
  }
  setEndDate(date: any) {
    this.endDate = date.substring(0, 10);
    this.filter.dateF = this.initialDate;
  }

  async openFilter() {
    const modal = this.modalController.create({
      component: FilterCaixaComponent,
    });

    (await modal).present();

    const { data } = await (await modal).onWillDismiss();
    this.load();
  }

  async openMenuOption(ev: any, type: number, op: boolean) {
    // const pop = await this.popCtrl.create({
    //   component: MenuSummaryComponent,
    //   event: ev,
    // });

    // pop.present();

    // const { data } = await pop.onWillDismiss();

    // if (data?.option === Constants.NEW_RETISTRATION) {
    if (type === 1) {
      this.newTithe(op);
    } else {
      this.newCaixa(op);
    }
    // } else if (data?.option === Constants.SHOW_GRAPH) {
    // // }
  }
}
