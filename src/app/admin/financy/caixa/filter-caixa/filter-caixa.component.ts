import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { CaixaFilter } from 'src/app/models/caixaFilter';
import { Constants } from 'src/app/models/constants';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-filter-caixa',
  templateUrl: './filter-caixa.component.html',
  styleUrls: ['./filter-caixa.component.scss'],
})
export class FilterCaixaComponent implements OnInit {
  filterList: string[];
  filter: CaixaFilter;
  isSmallDevice: boolean;
  monthYear: string;
  months: CustomizedMonth[];
  constructor(private platform: Platform, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.filter = UiService.localGet(Constants.CAIXA_FILTER);
    if (!this.filter) {
      this.filter = new CaixaFilter();
    }
    this.isSmallDevice = this.platform.width() <= 500;
    this.months = CustomizedMonth.getMonths();

    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    this.onSelectMonth(this.monthYear);
  }
  clean() {
    this.filter = new CaixaFilter();
    this.save();
  }

  setIsEntry(ev: any) {
    this.filter.isEntry = ev.target.value;
    this.save();
  }
  // setUser(ev: any) {
  //   this.filter.user.id = ev.target.value;
  //   this.save();
  //   console.clear();
  //   console.log(this.filter);
  // }

  save() {
    UiService.localSet(Constants.CAIXA_FILTER, this.filter);
  }

  makeFilter() {
    this.modalCtrl.dismiss();
  }

  onSelectMonth(value: any) {
    const dates = value.substring(0, 7).split('-');
    this.filter.month = dates[1];
    this.filter.year = dates[0];
  }
}
