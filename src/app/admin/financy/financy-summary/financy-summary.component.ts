import { MenuSummaryComponent } from './menu-summary/menu-summary.component';
import { UiService } from 'src/app/services/ui.service';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonPopover, ModalController, PopoverController } from '@ionic/angular';
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
import { Tithe } from 'src/app/models/tithe';
import { Wallet } from 'src/app/models/wallet';

@Component({
  selector: 'app-summary',
  templateUrl: './financy-summary.component.html',
  styleUrls: ['./financy-summary.component.scss'],
})
export class FinancySummaryComponent implements OnInit, AfterViewInit {
  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();

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

  localPageTitle: string;
  balance: number;
  wallet: Wallet;
  constructor(
    private financyService: FinancyService,
    private caixaFacade: CaixaFacadeService,
    private modalController: ModalController,
    private exeptionService: ExceptionService
  ) {}
  ngAfterViewInit(): void {
    this.wallet = new Wallet();
    this.wallet.id = Constants.WALLET_FLUX_ID;
    UiService.mySelectEmitter.emit({ obj: this.wallet, listName: 'wallets' });
  }

  ngOnInit() {
    this.localPageTitle = Constants.TITLE_SUMMARY_FINANCY_SUB;
    this.filter = new FinancySummaryFilter();
    const datePipe = new DatePipe('en');
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.initialDate = datePipe.transform(primeiroDia, 'YYYY-MM-dd');
    this.endDate = datePipe.transform(ultimoDia, 'YYYY-MM-dd');

    this.filter.dateI = this.initialDate;
    this.filter.dateF = this.endDate;
    this.filter.wallet_id = Constants.WALLET_FLUX_ID;

    this.load();
  }

  saveFilter() {
    UiService.localSet(Constants.FINANCY_SUMMARY_FILTER, this.filter);
  }

  receiveMantainceEmiter(ev: any) {
    this.load();
  }

  selectDateInterval(popover: IonPopover) {
    popover?.dismiss();
  }

  async load() {
    if (!this.filter?.dateI || !this.filter?.dateF || !this.filter.wallet_id) {
      this.exeptionService.alertDialog(
        'Selecione a data de inicio e fim da consulta',
        'Alerta'
      );
    }
    this.financyService.caixaSummary(this.filter).then((response) => {
      this.sumary = response.data;
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
      this.offerSummary = this.sumary.titheSummary?.offer;

      this.balance =
        this.inputSummary.total +
        this.offerSummary.total +
        this.titheSummary.total +
        this.outputSummary.total;
    });
  }

  goToBalance() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_BALANCE);
  }

  goToExpence() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_EXPENSE);
  }

  async newCaixa(op: boolean) {
    UiService.localRemove(Constants.CAIXA_MAINTAINCE);

    UiService.localSet(Constants.IS_ENTRY, op);
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_SUMMARY
    );
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_CAIXA_REGISTER);
  }
  async newTithe(isTithe: boolean) {
    const tithe: Tithe = new Tithe();
    tithe.isTithe = isTithe;
    UiService.localSet(Constants.TITHE_MAINTAINCE, tithe);
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
    this.filter.dateF = this.endDate;
  }

  async openFilter() {
    const modal = this.modalController.create({
      component: FilterCaixaComponent,
    });

    (await modal).present();

    const { data } = await (await modal).onWillDismiss();
    this.load();
  }

  async openMenuOption(type: number, op: boolean) {
    if (type === 1) {
      this.newTithe(op);
    } else {
      this.newCaixa(op);
    }
  }

  back() {
    this.sessionPage.emit(Constants.MENU_BACK);
  }

  setWallet(wallet: Wallet) {
    if (wallet) {
      this.wallet = wallet;
      this.filter.wallet_id = this.wallet.id;
      this.load();
      UiService.localSet(Constants.CAIXA_WALLET, this.wallet);
    } else {
      this.wallet = null;
      UiService.localRemove(Constants.CAIXA_WALLET);
    }
  }
}
