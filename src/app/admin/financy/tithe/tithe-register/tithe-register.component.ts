import { Constants } from './../../../../models/constants';
import { DatePipe } from '@angular/common';
import { Tithe } from 'src/app/models/tithe';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController, Platform, ModalController } from '@ionic/angular';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { TitheService } from 'src/app/services/tithe.service';
import { ConstantMessages } from 'src/app/models/messages';

@Component({
  selector: 'app-tithe-register',
  templateUrl: './tithe-register.component.html',
  styleUrls: ['./tithe-register.component.scss'],
})
export class TitheRegisterComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  tithe: Tithe;
  isNew: boolean;

  monthYear: string;
  months: CustomizedMonth[];
  isSmallDevice: boolean;
  value: string;
  isTithe: string;
  customizedMonth: CustomizedMonth;
  year: string;
  constructor(
    private titheService: TitheService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.tithe = UiService.localGet(Constants.TITHE_MAINTAINCE);
    console.log(this.tithe);
    if (!this.tithe) {
      this.tithe = new Tithe();
      this.value = '';
      this.isTithe = '1';
      this.isNew = true;
    } else {
      this.value = UiService.convertToCurrency(this.tithe?.amount);
      this.isTithe = String(this.tithe?.isTithe);
      this.isNew = false;
    }
    this.isSmallDevice = this.platform.width() <= 500;
    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    this.onSelectMonth(this.monthYear);
  }

  onSelectMonth(value: any) {
    console.log(value);
    if (!value) {
      value = this.monthYear;
    }
    const dates = value.substring(0, 7).split('-');
    this.tithe.month = dates[1];
    this.tithe.year = dates[0];
    this.year = this.tithe?.year;
    this.customizedMonth = new CustomizedMonth(Number(this.tithe?.month));
  }
  setIsTithe(ev: any) {
    this.tithe.isTithe = ev.target.value;
  }

  async register(amount: any) {
    this.tithe.amount = UiService.convertToNumber(amount);
    if (this.isFormValid()) {
      const tipo = this.tithe?.isTithe ? 'do dízimo' : 'da oferta';

      if (!this.isNew) {
        await this.titheService.update(this.tithe);
        this.exceptionService.openLoading(
          `Entrada ${tipo} alterado com Sucesso!`
        );
      } else {
        await this.titheService.store(this.tithe);
        this.exceptionService.openLoading(
          `Entrada ${tipo} registrado com Sucesso!`
        );
      }

      this.back();
    }
  }

  isFormValid() {
    if (!this.tithe?.amount || this.tithe?.amount <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.AMOUNT_INVALID);
      return;
    }

    if (!this.tithe.month || !this.tithe?.year) {
      this.exceptionService.alertDialog(ConstantMessages.MONTH_YEAR_INVALID);
      return;
    }

    if (!this.tithe?.isTithe) {
      this.exceptionService.alertDialog(ConstantMessages.TITHE_TYPE_INVALID);
      return;
    }

    return true;
  }

  back() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_TITHE);
  }
}
