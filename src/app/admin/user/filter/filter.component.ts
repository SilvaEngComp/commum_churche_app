import { CustomizedMonth } from './../../../models/customizedMonth';
import { UserFilter } from 'src/app/models/userFilter';
import { Constants } from './../../../models/constants';
import { Component, OnInit } from '@angular/core';
import { Church } from 'src/app/models/church';
import { InputMethod } from 'src/app/models/inputhMethod';
import { MaritalStatus } from 'src/app/models/maritalStatus';
import { InputMethodService } from 'src/app/services/input-method.service';
import { MaritalStatusService } from 'src/app/services/marital-status.service';
import { ChurchService } from 'src/app/services/church.service';
import { UiService } from 'src/app/services/ui.service';
import { Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterList: string[];
  filter: UserFilter;
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
    this.filterList = Constants.USER_FILTER_LIST;
    this.filter = UiService.localGet(Constants.USER_FILTER);
    if (!this.filter) {
      this.filter = new UserFilter();
    }
    this.isSmallDevice = this.platform.width() <= 500;
    this.months = CustomizedMonth.getMonths();
    this.load();
  }
  clean() {
    this.filter = new UserFilter();
    this.filterList = Constants.USER_FILTER_LIST;
    this.save();
  }
  async load() {
    const inputMethodResponser = await this.inputMethodService.get();
    this.inputMethods = inputMethodResponser.data;
    const maritalResponser = await this.maritalStatusService.get();
    this.maritalStatuses = maritalResponser.data;
    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;
  }
  setBirthdayFilter(ev: any) {
    this.filter.birthdayMonth = ev.target.value;
    console.clear();
    console.log(this.filter);
    this.save();
  }
  setIsBaptized(ev: any) {
    this.filter.isBaptized = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }
  setGender(ev: any) {
    this.filter.gender = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }

  setMaritalStatus(ev: any) {
    if (!this.filter.maritalStatus) {
      this.filter.maritalStatus = new MaritalStatus();
    }
    this.filter.maritalStatus.id = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }

  setInputMethod(ev: any) {
    if (!this.filter.inputMethod) {
      this.filter.inputMethod = new InputMethod();
    }
    this.filter.inputMethod.id = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }

  setChurch(ev: any) {
    if (!this.filter.church) {
      this.filter.church = new Church();
    }
    this.filter.church.id = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }
  setMonth(ev: any) {
    this.filter.birthdayMonth = ev.target.value;
    this.save();
    console.clear();
    console.log(this.filter);
  }
  save() {
    UiService.localSet(Constants.USER_FILTER, this.filter);
  }

  makeFilter() {
    this.modalCtrl.dismiss();
  }
}
