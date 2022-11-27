import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Church } from 'src/app/models/church';
import { Constants } from 'src/app/models/constants';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { InputMethod } from 'src/app/models/inputhMethod';
import { MaritalStatus } from 'src/app/models/maritalStatus';
import { TitheFilter } from 'src/app/models/titheFilter';
import { ChurchService } from 'src/app/services/church.service';
import { InputMethodService } from 'src/app/services/input-method.service';
import { MaritalStatusService } from 'src/app/services/marital-status.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-filter-tithe',
  templateUrl: './filter-tithe.component.html',
  styleUrls: ['./filter-tithe.component.scss'],
})
export class FilterTitheComponent implements OnInit {
  filterList: string[];
  filter: TitheFilter;
  maritalStatuses: MaritalStatus[];
  inputMethods: InputMethod[];
  churches: Church[];
  isSmallDevice: boolean;
  monthYear: string;
  months: CustomizedMonth[];
  constructor(
    private inputMethodService: InputMethodService,
    private maritalStatusService: MaritalStatusService,
    private churchService: ChurchService,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.filterList = Constants.TITHE_FILTER_LIST;
    this.filter = UiService.localGet(Constants.TITHE_FILTER);
    if (!this.filter) {
      this.filter = new TitheFilter();
    }
    this.isSmallDevice = this.platform.width() <= 500;
    this.months = CustomizedMonth.getMonths();
    this.load();
  }
  clean() {
    this.filter = new TitheFilter();
    this.filterList = Constants.TITHE_FILTER_LIST;
    this.save();
  }

  setIsTithe(ev: any) {
    this.filter.isTithe = ev.target.value;
    this.save();
  }
  setUser(ev: any) {
    this.filter.user.id = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }

  setMonth(ev: any) {
    this.filter.month = ev.target.value;
    this.save();
  }
  save() {
    UiService.localSet(Constants.TITHE_FILTER, this.filter);
  }

  makeFilter() {
    this.modalCtrl.dismiss();
  }
}
