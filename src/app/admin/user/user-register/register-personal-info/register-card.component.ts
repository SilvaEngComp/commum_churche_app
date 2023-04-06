import { DayToSelectComponent } from '../../../../resources/day-to-select/day-to-select.component';
import { DatePipe } from '@angular/common';
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { UiService } from 'src/app/services/ui.service';
import {
  IonDatetime,
  IonPopover,
  Platform,
  PopoverController,
} from '@ionic/angular';
import { MaritalStatus } from 'src/app/models/maritalStatus';
import { Church } from 'src/app/models/church';
import { InputMethod } from 'src/app/models/inputhMethod';
import { ConstantMessages } from 'src/app/models/messages';
import { ChurchService } from 'src/app/services/church.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { InputMethodService } from 'src/app/services/input-method.service';
import { MaritalStatusService } from 'src/app/services/marital-status.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss'],
})
export class RegisterCardComponent implements OnInit {
  @Output() session: EventEmitter<number> = new EventEmitter<number>();
  user: User;
  dateSelected: boolean;
  @ViewChild('timeData', { static: false }) timeData: IonDatetime;
  @ViewChild('popDay', { static: false }) popDay: IonPopover;
  today: string;
  maritalStatuses: MaritalStatus[];
  inputMethods: InputMethod[];
  churches: Church[];
  isSmallDevice: boolean;
  days: string[] = [];
  day: string;
  monthYear: string;

  constructor(
    private exceptionService: ExceptionService,
    private inputMethodService: InputMethodService,
    private maritalStatusService: MaritalStatusService,
    private platform: Platform,
    private churchService: ChurchService,
    private popCtrl: PopoverController,
    private usuarioService: UserService
  ) {}
  ngOnInit() {
    this.user = UiService.localGet(Constants.REGISTRING_USER);
    if (!this.user) {
      this.user = new User();
      this.save();
    }
    const date = new DatePipe('en');

    this.today = date.transform(Date.now(), 'yyyy-MM-dd');

    this.load();

    this.isSmallDevice = this.platform.width() <= 500;
  }

  async load() {
    const inputMethodResponser = await this.inputMethodService.get();
    this.inputMethods = inputMethodResponser.data;

    const maritalResponser = await this.maritalStatusService.get();
    this.maritalStatuses = maritalResponser.data;
    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;
  }

  save() {
    UiService.localSet(Constants.REGISTRING_USER, this.user);
  }

  validForm() {
    if (this.user.name.length <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    }

    const validName: string[] = this.user.name.split(' ');
    if (validName.length < 2) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    } else {
      if (validName[0].length <= 0 || validName[1].length <= 0) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID_SPACE,
          'Erro'
        );
        return false;
      }
    }

    if (
      !this.user?.contact?.phone1 ||
      this.user?.contact?.phone1?.length <= 0
    ) {
      this.exceptionService.alertDialog(ConstantMessages.PHONE_INVALID, 'Erro');
      return false;
    } else {
      if (this?.user?.contact?.phone1) {
        this.user.contact.phone1 = this.user.contact.phone1.replace(
          /[^\d]+/g,
          ''
        );
      }
    }

    if (!this.user.birthDate || this.user.birthDate.length < 10) {
      this.exceptionService.alertDialog(
        ConstantMessages.BIRTHDATE_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user.isBaptized) {
      this.exceptionService.alertDialog(
        ConstantMessages.ISBAPTIZED_INVALID,
        'Erro'
      );
      return false;
    }
    if (this.user?.gender?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.GENDER_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user?.maritalStatus?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.MARITAL_STATUS_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user?.inputMethod?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.INPUT_METHOD_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user?.church?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.CHURCH_INVALID,
        'Erro'
      );
      return false;
    }

    this.user.password = this.user.birthDate;
    return true;
  }

  setIsBaptized(ev: any) {
    this.user.isBaptized = ev.target.value;
    this.save();
    console.log(this.user);
  }
  setGender(ev: any) {
    this.user.gender = ev.target.value;
    this.save();
  }

  setMaritalStatus(ev: any) {
    if (!this.user.maritalStatus) {
      this.user.maritalStatus = new MaritalStatus();
    }
    this.user.maritalStatus.id = ev.target.value;
    this.save();
  }

  setInputMethod(ev: any) {
    if (!this.user.inputMethod) {
      this.user.inputMethod = new InputMethod();
    }
    this.user.inputMethod.id = ev.target.value;
    this.save();
  }

  setChurch(ev: any) {
    if (!this.user.church) {
      this.user.church = new Church();
    }
    this.user.church.id = ev.target.value;
    this.save();
  }

  onSelectData(date: any) {
    this.user.birthDate = date.substring(0, 10);
    this.save();
  }

  onSelectMonth(value: any) {
    this.monthYear = value.substring(0, 7);
    this.setBirthdate();
  }

  setBirthdate() {
    console.clear();
    this.user.birthDate = this.monthYear + '-' + this.day;
    console.log(this.user.birthDate);
    this.save();
  }

  async openDay(ev: any) {
    const pop = await this.popCtrl.create({
      component: DayToSelectComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onDidDismiss();
    console.log(data.day);
    if (data) {
      this.day = data.day;
      this.setBirthdate();
    }
  }

  register() {
    if (this.validForm()) {
      this.exceptionService.loadingFunction();

      this.usuarioService
        .createByCard(this.user)
        .then(() => {
          this.user = new User();
          this.exceptionService.openLoading(
            ConstantMessages.FINISHING_REGISTRATION_TITLE,
            ConstantMessages.FINISHING_ADMIN_REGISTRATION_SUCCESS,
            true,
            30000
          );
        })
        .catch((erro) => {
          this.exceptionService.error(erro);
        });
    }
  }
}
