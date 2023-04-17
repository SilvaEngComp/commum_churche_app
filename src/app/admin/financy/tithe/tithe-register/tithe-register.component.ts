import { LoginService } from './../../../../services/login.service';
import { Constants } from './../../../../models/constants';
import { DatePipe } from '@angular/common';
import { Tithe } from 'src/app/models/tithe';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AlertController, IonInput, Platform } from '@ionic/angular';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { TitheService } from 'src/app/services/tithe.service';
import { ConstantMessages } from 'src/app/models/messages';
import { User } from 'src/app/models/User';
import { Church } from 'src/app/models/church';

@Component({
  selector: 'app-tithe-register',
  templateUrl: './tithe-register.component.html',
  styleUrls: ['./tithe-register.component.scss'],
})
export class TitheRegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('inputAmount', { static: false }) inputAmount: IonInput;
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  tithe: Tithe;
  isNew: boolean;

  monthYear: string;
  months: CustomizedMonth[];
  isSmallDevice: boolean;
  value: string;
  customizedMonth: CustomizedMonth;
  year: string;
  localPageTitle: string;
  datePipe: DatePipe;
  lastMonth: string;
  currentMonth: string;
  constructor(
    private titheService: TitheService,
    private exceptionService: ExceptionService,
    private platform: Platform,
    private actionCtrl: AlertController
  ) {}
  ngAfterViewInit(): void {
    this.inputAmount.setFocus();
  }

  ngOnInit() {
    this.validTithe();

    if (this.tithe.isTithe) {
      this.localPageTitle = Constants.TITLE_TITHE_REGISTER;
    } else {
      this.localPageTitle = Constants.TITLE_OFFER_REGISTER;
    }
    UiService.localSet(Constants.TITLE_CURRENT_PAGE, this.localPageTitle);
    UiService.pageTitle.emit(this.localPageTitle);
  }

  onSetDate(value: any, option: number = 0) {
    if (value) {
      this.tithe.date = value.substring(0, 10);
    } else {
      if (option === 1) {
        this.tithe.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      } else {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        this.tithe.date = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
      }
    }
  }

  validTithe() {
    this.tithe = UiService.localGet(Constants.TITHE_MAINTAINCE);
    if (!this.tithe) {
      this.exceptionService.alertDialog(Constants.INVALID_OPTION, 'Erro!');
      this.back();
    }
    this.isNew = true;

    if (this.tithe?.id) {
      this.isNew = false;
    } else {
      this.value = '0,0';
    }
    this.isSmallDevice = this.platform.width() <= 500;

    this.isSmallDevice = this.platform.width() <= 500;
    this.datePipe = new DatePipe('en');
    this.tithe.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  setIsTithe(ev: any) {
    this.tithe.isTithe = ev.target.value;
  }

  async register(amount: any) {
    this.tithe.amount = UiService.convertToNumber(amount);
    if (this.isFormValid()) {
      const tipo = this.tithe?.isTithe ? 'do dízimo' : 'da oferta';

      if (!this.isNew) {
        this.titheService
          .update(this.tithe)
          .then(() => {
            this.exceptionService.toastHandler(
              `Entrada ${tipo} alterada com Sucesso!`,
              5000
            );
          })
          .finally(() => this.askNeedDoAgain());
      } else {
        await this.titheService
          .store(this.tithe)
          .then(() => {
            this.exceptionService.toastHandler(
              `Entrada ${tipo} registrada com Sucesso!`,
              5000
            );
          })
          .finally(() => this.askNeedDoAgain());
      }
    }
  }

  async askNeedDoAgain() {
    const action = await this.actionCtrl.create({
      header: 'O que deseja fazer?',
      subHeader: 'Deseja realizar outro registro ?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            window.location.reload();
          },
        },
        {
          text: 'Não',
          handler: () => {
            this.back();
          },
        },
      ],
    });

    await action.present();
  }

  isFormValid() {
    if (!this.tithe?.amount || this.tithe?.amount <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.AMOUNT_INVALID);
      return;
    }

    if (!this.tithe.date) {
      this.exceptionService.alertDialog(ConstantMessages.DATE_INVALID);
      return;
    }

    if (UiService.validPermissions(Constants.FINANCIAL)) {
      if (!this.tithe?.user?.id) {
        this.exceptionService.alertDialog(ConstantMessages.MEMBER_INVALID);
        return;
      }
    }

    this.tithe.register = new User(true);
    this.tithe.register.id = LoginService.getUser()?.id;

    return true;
  }

  back() {
    this.sessionPage.emit(UiService.localGet(Constants.BACK_PAGE));
  }

  setUser(user: User) {
    if (user) {
      this.tithe.user = new User(true);
      this.tithe.user.id = user.id;
    } else {
      this.tithe.user = null;
    }
  }

  setChurch(church: Church) {
    if (church) {
      this.tithe.church = church;
    } else {
      this.tithe.church = null;
    }
  }
}
