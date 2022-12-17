import { UiService } from 'src/app/services/ui.service';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  monthYear: string;
  showCaixaOutputDetail: boolean;
  showCaixaInputDetail: boolean;
  showTitheDetail: boolean;
  showOfferDetail: boolean;
  showInputsDetail: boolean;
  customizedMonth: CustomizedMonth;

  constructor(
    private financyService: FinancyService,
    private exceptionService: ExceptionService,
    private caixaFacade: CaixaFacadeService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.filter = UiService.localGet(Constants.FINANCY_SUMMARY_FILTER);
    if (!this.filter) {
      this.filter = new FinancySummaryFilter();
      const datePipe = new DatePipe('en');
      this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
      this.onSelectMonth(this.monthYear);
    } else {
      this.customizedMonth = new CustomizedMonth(Number(this.filter?.month));
    }

    this.load();
  }

  saveFilter() {
    UiService.localSet(Constants.FINANCY_SUMMARY_FILTER, this.filter);
  }

  receiveMantainceEmiter(ev: any) {
    console.log('reload request received');
    this.load();
  }

  async load() {
    if (this.filter?.month && this.filter?.year) {
      const response = await this.financyService.caixaSummary(this.filter);

      if (response?.data) {
        this.sumary = response.data;
      }
      this.inputSummary = new CaixaSummary();
      this.outputSummary = new CaixaSummary();
      this.titheSummary = new TitheSummary();
      this.offerSummary = new TitheSummary();
      this.sumary.caixaSummary?.input?.filter(
        (caixaSummary) => (this.inputSummary.total += caixaSummary?.total)
      );
      this.sumary.caixaSummary?.output?.filter(
        (caixaSummary) => (this.outputSummary.total += caixaSummary?.total)
      );

      this.titheSummary = this.sumary.titheSummary?.tithe;
      this.offerSummary = this.sumary.titheSummary?.offer;
    }
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

  onSelectMonth(value: any) {
    console.clear();
    this.monthYear = value.substring(0, 7);
    const dates = this.monthYear.split('-');
    this.filter.month = dates[1];
    this.filter.year = dates[0];
    this.customizedMonth = new CustomizedMonth(Number(this.filter?.month));
    this.saveFilter();
    this.load();
  }

  async newCaixa() {
    this.sessionPage.emit('2');
  }

  async edit(caixa: Caixa) {
    this.exceptionService.alertDialog(
      Constants.IN_DEVELOPMENT,
      Constants.IN_DEVELOPMENT_TITLE
    );
    // const modal = await this.modalCtrl.create({
    //   component: CaixaRegisterComponent,
    //   componentProps: { caixa, permission: this.permission, op: 'caixa-alter' },
    // });

    // await modal.present();

    // await modal.onDidDismiss().then(() => this.loadCaixas());
  }

  delete(caixa: Caixa) {
    this.caixaFacade.delete(caixa);
  }

  back() {
    this.sessionPage.emit(Constants.PAGE_FINANCY_CAIXA);
  }

  async openFilter() {
    const modal = this.modalController.create({
      component: FilterCaixaComponent,
    });

    (await modal).present();

    const { data } = await (await modal).onWillDismiss();
    this.load();
  }
}
