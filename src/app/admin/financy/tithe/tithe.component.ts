import { MenuTitheComponent } from './menu-tithe/menu-tithe.component';
import { TitheFilter } from './../../../models/titheFilter';
import { CustomizedMonth } from './../../../models/customizedMonth';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Tithe } from 'src/app/models/tithe';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { TitheFacade } from 'src/app/facades/tithe-facade.service';
import { FilterTitheComponent } from './filter-tithe/filter-tithe.component';
import { DatePipe } from '@angular/common';

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
  monthYear: string;
  isFilterShowed: boolean;
  funcIsLoading: boolean;
  label: string;
  inferiorLimit: number;
  upperLimit: number;
  paginationNumber: number;
  tresholderPagination: number;
  filter: TitheFilter;
  headTitheList: string[] = ['Valor', 'Tipo', 'Data'];
  customizedMonth: CustomizedMonth;
  constructor(
    private titheFacade: TitheFacade,
    private modalController: ModalController,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_TITHE_HISTORIC
    );

    UiService.pageTitle.emit(Constants.TITLE_TITHE_HISTORIC);
    this.filter = UiService.localGet(Constants.TITHE_FILTER);
    if (!this.filter) {
      this.filter = new TitheFilter();
    }

    this.titheFacade.dataLoaded.subscribe((data) => {
      this.isLoading = false;

      console.log(this.tithes);
      UiService.localSet('upperTitheLimit', 10);
      UiService.localSet('inferiorTitheLimit', 0);
    });

    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    this.onSelectMonth(this.monthYear);
  }

  load() {
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

  delete(tithe: Tithe) {
    this.titheFacade.delete(tithe);
  }
  onSelectMonth(value: any) {
    this.monthYear = value.substring(0, 7);
    const dates = this.monthYear.split('-');
    this.filter.year = dates[0];
    this.filter.month = dates[1];
    UiService.localSet(Constants.TITHE_FILTER, this.filter);
    this.customizedMonth = new CustomizedMonth(Number(this.filter?.month));
    this.load();
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
    if (data.action) {
      this.load();
    }
  }

  newTithe(isTithe: boolean) {
    const tithe: Tithe = new Tithe();
    tithe.isTithe = isTithe;
    UiService.localSet(Constants.TITHE_MAINTAINCE, tithe);
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_TITHE
    );
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_TITHE_REGISTER);
  }
  editTithe(tithe: Tithe) {
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_TITHE
    );
    UiService.localSet(Constants.TITHE_MAINTAINCE, tithe);
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_TITHE_REGISTER);
  }

  async openMenuOption(ev: any) {
    const pop = await this.popCtrl.create({
      component: MenuTitheComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onWillDismiss();

    if (data?.option === Constants.TITHE_MENU_OPTION_TITHE) {
      this.newTithe(true);
    } else {
      this.newTithe(false);
    }
  }
}
