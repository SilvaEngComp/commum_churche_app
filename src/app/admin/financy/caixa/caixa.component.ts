import { FilterCaixaComponent } from './filter-caixa/filter-caixa.component';
import { ModalController } from '@ionic/angular';
import { CaixaFacadeService } from './../../../facades/caixa-facade.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { DatePipe } from '@angular/common';
import { FinancySummary } from 'src/app/models/fianancySummary';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { Caixa } from 'src/app/models/caixa';
import { FinancyService } from 'src/app/services/financy-service.service';
import { CaixaSummary } from 'src/app/models/caixaSummary';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss'],
})
export class CaixaComponent implements OnInit {
  // @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  // filter: FinancySummaryFilter;
  // sumary: FinancySummary;
  // month: string;
  // year: string;
  // caixaSummary: CaixaSummary;
  // monthYear: string;
  // headCaixaList: string[] = ['Registrado por', 'Tipo', 'Motivo'];
  constructor() // private financyService: FinancyService,
  // private exceptionService: ExceptionService,
  // private caixaFacade: CaixaFacadeService,
  // private modalController: ModalController
  {}
  ngOnInit() {
    // if (!this.filter) {
    //   this.filter = new FinancySummaryFilter();
    // }
    // this.caixaSummary = new CaixaSummary();
    // const datePipe = new DatePipe('en');
    // this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    // this.onSelectMonth(this.monthYear);
    // this.load();
  }
  // async load() {
  //   if (this.filter?.month && this.filter?.year) {
  //     const response = await this.financyService.caixaSummary(this.filter);
  //     console.log(response);
  //     if (response?.data) {
  //       this.sumary = response.data;
  //     }
  //     this.caixaSummary.total = 0;
  //     this.sumary.caixaSummary.filter((caixa) => {
  //       this.caixaSummary.total += caixa?.total;
  //     });
  //   }
  //   console.log(this.sumary);
  // }
  // setShowSummaryDetail(caixa: CaixaSummary) {
  //   const position = this.sumary.caixaSummary.indexOf(caixa);
  //   this.sumary.caixaSummary[position].showDetails =
  //     !this.sumary.caixaSummary[position].showDetails;
  // }
  // setShowCaixaDetail(caixa: Caixa, caixaSummary: CaixaSummary) {
  //   const summaryPosition = this.sumary.caixaSummary?.indexOf(caixaSummary);
  //   const caixaPosition =
  //     this.sumary.caixaSummary[summaryPosition].caixas.indexOf(caixa);
  //   this.sumary.caixaSummary[summaryPosition].caixas[
  //     caixaPosition
  //   ].showDetails =
  //     !this.sumary.caixaSummary[summaryPosition].caixas[caixaPosition]
  //       .showDetails;
  // }
  // showMoreCaixaSummary(caixa: CaixaSummary) {}
  // onSelectMonth(value: any) {
  //   console.clear();
  //   this.monthYear = value.substring(0, 7);
  //   const dates = this.monthYear.split('-');
  //   console.log(dates);
  //   this.filter.month = dates[1];
  //   this.filter.year = dates[0];
  //   console.log(this.filter);
  // }
  // async newCaixa() {
  //   this.sessionPage.emit('2');
  // }
  // async edit(caixa: Caixa) {
  //   this.exceptionService.alertDialog(
  //     Constants.IN_DEVELOPMENT,
  //     Constants.IN_DEVELOPMENT_TITLE
  //   );
  //   // const modal = await this.modalCtrl.create({
  //   //   component: CaixaRegisterComponent,
  //   //   componentProps: { caixa, permission: this.permission, op: 'caixa-alter' },
  //   // });
  //   // await modal.present();
  //   // await modal.onDidDismiss().then(() => this.loadCaixas());
  // }
  // delete(caixa: Caixa) {
  //   this.caixaFacade.delete(caixa);
  // }
  // back() {
  //   this.sessionPage.emit(Constants.PAGE_FINANCY_CAIXA);
  // }
  // async openFilter() {
  //   const modal = this.modalController.create({
  //     component: FilterCaixaComponent,
  //   });
  //   (await modal).present();
  //   const { data } = await (await modal).onWillDismiss();
  //   this.load();
  // }
}
