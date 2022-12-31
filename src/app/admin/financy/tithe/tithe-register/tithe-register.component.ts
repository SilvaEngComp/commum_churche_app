import { LoginService } from './../../../../services/login.service';
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
import { User } from 'src/app/models/User';

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
      this.tithe.isTithe = UiService.localGet(Constants.IS_TITHE);
      this.isNew = true;
    } else {
      this.value = UiService.convertToCurrency(this.tithe?.amount);
      this.isNew = false;
    }
    this.isSmallDevice = this.platform.width() <= 500;
    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    this.onSelectMonth(this.monthYear);
    let pageTitle;
    if (this.tithe.isTithe) {
      pageTitle = Constants.TITLE_TITHE_REGISTER;
    } else {
      pageTitle = Constants.TITLE_OFFER_REGISTER;
    }
    UiService.localSet(Constants.TITLE_CURRENT_PAGE, pageTitle);
    UiService.pageTitle.emit(pageTitle);
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
        this.titheService.update(this.tithe).then(() => {
          this.exceptionService.toastHandler(
            `Entrada ${tipo} alterada com Sucesso!`,
            5000
          );

          this.back();
        });
      } else {
        await this.titheService.store(this.tithe).then(() => {
          this.exceptionService.toastHandler(
            `Entrada ${tipo} registrada com Sucesso!`,
            5000
          );
          this.back();
        });
      }
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

    if (UiService.validPermissions(Constants.FINANCIAL)) {
      if (!this.tithe?.user?.id) {
        this.exceptionService.alertDialog(ConstantMessages.USER_INVALID);
        return;
      }
    } else {
      this.tithe.user = LoginService.getUser();
    }

    return true;
  }

  back() {
    this.sessionPage.emit(UiService.localGet(Constants.BACK_PAGE));
  }

  setUser(user: User) {
    if (user) {
      this.tithe.user = user;
    } else {
      this.tithe.user = null;
    }
  }
}
