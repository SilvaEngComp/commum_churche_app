import { CustomizedMonth } from './../../../models/customizedMonth';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Tithe } from 'src/app/models/tithe';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { TitheFacade } from 'src/app/facades/tithe-facade.service';
import { FilterTitheComponent } from './filter-tithe/filter-tithe.component';

@Component({
  selector: 'app-tithe',
  templateUrl: './tithe.component.html',
  styleUrls: ['./tithe.component.scss'],
})
export class TitheComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  @Input() role: string;
  page: string;
  permission: number;
  tithes: Tithe[];
  limit: number;
  base_url: string = environment.IMAGE_URL;
  isSearching: boolean;
  isSellerShowed: boolean;
  isFilterCustomerShowed: boolean;
  isLoading: boolean;

  isFilterShowed: boolean;
  funcIsLoading: boolean;
  label: string;
  inferiorLimit: number;
  upperLimit: number;
  paginationNumber: number;
  tresholderPagination: number;

  constructor(
    private titheFacade: TitheFacade,
    private exceptionService: ExceptionService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadTithes();

    this.tresholderPagination = 10;
    this.inferiorLimit = UiService.localGet(Constants.TITHE_INFERIOR_LIMIT);
    this.upperLimit = UiService.localGet(Constants.TITHE_SUPERIOR_LIMIT);
    if (!this.inferiorLimit) {
      this.inferiorLimit = 0;
    }
    if (!this.upperLimit) {
      this.upperLimit = this.tresholderPagination;
    }

    this.paginationNumber = this.upperLimit / this.tresholderPagination;
    this.titheFacade.dataLoaded.subscribe((data) => {
      this.isLoading = false;
      this.tithes = data.data.filter((tithe) => {
        tithe.customizedMonth = new CustomizedMonth(tithe.month);
        return tithe;
      });
      console.log(this.tithes);
      UiService.localSet('upperTitheLimit', 10);
      UiService.localSet('inferiorTitheLimit', 0);
    });
  }

  loadTithes() {
    console.log('is loading');
    this.isLoading = true;
    this.titheFacade.load();
  }

  backPage() {
    if (this.upperLimit > this.tresholderPagination) {
      this.inferiorLimit -= this.tresholderPagination;
      this.upperLimit -= this.tresholderPagination;
      this.paginationNumber--;
      this.limitsSave();
    }
  }

  nextPage() {
    if (this.upperLimit <= this.tithes.length) {
      this.inferiorLimit += this.tresholderPagination;
      this.upperLimit += this.tresholderPagination;
      this.paginationNumber++;
      this.limitsSave();
    }
  }

  limitsSave() {
    UiService.localSet(Constants.TITHE_SUPERIOR_LIMIT, this.upperLimit);
    UiService.localSet(Constants.TITHE_INFERIOR_LIMIT, this.inferiorLimit);
  }

  search(search: any) {
    this.tithes = null;
    this.tithes = this.titheFacade.searchTithe(search);
  }

  async newTithe() {
    this.titheFacade.registerTithe();
  }

  async edit(tithe: Tithe) {
    this.exceptionService.alertDialog(
      Constants.IN_DEVELOPMENT,
      Constants.IN_DEVELOPMENT_TITLE
    );
    // const modal = await this.modalCtrl.create({
    //   component: TitheRegisterComponent,
    //   componentProps: { tithe, permission: this.permission, op: 'tithe-alter' },
    // });

    // await modal.present();

    // await modal.onDidDismiss().then(() => this.loadTithes());
  }

  delete(tithe: Tithe) {
    this.titheFacade.delete(tithe);
  }

  back() {
    this.sessionPage.emit(Constants.PAGE_FINANCY_TITHE);
  }

  setShowDetail(tithe: Tithe) {
    const position = this.tithes.indexOf(tithe);

    this.tithes[position].showDetails = !this.tithes[position].showDetails;
  }

  async openFilter() {
    const modal = this.modalController.create({
      component: FilterTitheComponent,
    });

    (await modal).present();

    const { data } = await (await modal).onWillDismiss();
    this.loadTithes();
  }
}
