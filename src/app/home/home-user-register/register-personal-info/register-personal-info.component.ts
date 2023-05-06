/* eslint-disable @typescript-eslint/no-shadow */
import { ChurchService } from './../../../services/church.service';
import { InputMethod } from './../../../models/inputhMethod';
import { MaritalStatusService } from './../../../services/marital-status.service';
import { InputMethodService } from './../../../services/input-method.service';
import { DatePipe } from '@angular/common';
/* eslint-disable @typescript-eslint/member-ordering */
import { ConstantMessages } from './../../../models/messages';
import { ExceptionService } from './../../../services/exception-service.service';
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
import { DayToSelectComponent } from 'src/app/resources/day-to-select/day-to-select.component';
@Component({
  selector: 'app-register-personal-info',
  templateUrl: './register-personal-info.component.html',
  styleUrls: ['./register-personal-info.component.scss'],
})
export class RegisterPersonalInfoComponent implements OnInit {
  @Output() session: EventEmitter<number> = new EventEmitter<number>();
  user: User;
  dateSelected: boolean;
  @ViewChild('timeData', { static: false }) timeData: IonDatetime;
  @ViewChild('popDay', { static: false }) popDay: IonPopover;
  maritalStatuses: MaritalStatus[];
  inputMethods: InputMethod[];
  churches: Church[];
  isSmallDevice: boolean;
  days: string[] = [];
  day: string;
  monthYear: string;
  subsession: number;
  date: DatePipe;

  constructor(
    private exceptionService: ExceptionService,
    private inputMethodService: InputMethodService,
    private maritalStatusService: MaritalStatusService,
    private platform: Platform,
    private churchService: ChurchService,
    private popCtrl: PopoverController
  ) {}
  ngOnInit() {
    this.subsession = UiService.localGet(Constants.REGISTRING_USER_SUBSESSION);
    if (!this.subsession) {
      this.subsession = 1;
    }
    this.user = UiService.localGet(Constants.REGISTRING_USER);
    if (!this.user) {
      this.user = new User();
      this.save();
    }
    this.date = new DatePipe('en');

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
    UiService.localSet(Constants.REGISTRING_USER_SUBSESSION, this.subsession);
  }

  backSubsection() {
    this.subsession--;
  }

  setSubsession() {
    let flag = false;
    switch (this.subsession) {
      case 1:
        flag = this.checkName();
        break;
      case 2:
        flag = this.checkPhone();
        break;
      case 3:
        flag = this.checkBirthday();
        break;
      case 4:
        flag = this.checkIsBaptized();
        break;
      case 5:
        flag = this.checkGender();
        break;
      case 6:
        flag = this.checkMaritalStatus();
        break;
      case 7:
        flag = this.checkInputMethod();
        break;
      case 8:
        flag = this.checkChurch();
        break;
    }

    if (flag || this.subsession === 9) {
      this.subsession++;
      this.save();
    }
    if (this.subsession === 10) {
      this.session.emit(2);
    }
  }

  checkPhone() {
    if (
      !this.user?.contact?.phone1 ||
      this.user?.contact?.phone1?.length < 10
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
    return true;
  }

  checkName() {
    if (!this?.user?.name) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    } else {
      const regex = new RegExp(/^[A-Za-z\s]*$/g);
      if (!regex.test(this?.user?.name)) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID_NOT_LETTERS,
          'Erro'
        );
        return false;
      }

      const validName: string[] = this?.user?.name?.split(' ');
      if (validName?.length < 2) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID,
          'Erro'
        );
        return false;
      } else {
        let name = '';
        validName.filter((text) => {
          text = text.replace(/[^aA-zZ]+/g, '');
          name += text + ' ';
        });

        if (validName[0]?.length <= 0 || validName[1]?.length <= 0) {
          this.exceptionService.alertDialog(
            ConstantMessages.NAME_INVALID_SPACE,
            'Erro'
          );
          return false;
        }

        const regex = new RegExp(/[aA-zZ]+[\s]+[aA-zZ]+/g);
        if (!regex.test(name)) {
          this.exceptionService.alertDialog(
            ConstantMessages.NAME_INVALID_NOT_LETTERS,
            'Erro'
          );
          return false;
        }

        this.user.name = name;
      }
    }
    return true;
  }

  checkBirthday() {
    if (!this?.user?.birthDate || this?.user?.birthDate?.length < 10) {
      this.exceptionService.alertDialog(
        ConstantMessages.BIRTHDATE_INVALID,
        'Erro'
      );
      return false;
    }
    return true;
  }

  checkIsBaptized() {
    if (!this?.user?.isBaptized) {
      this.exceptionService.alertDialog(
        ConstantMessages.ISBAPTIZED_INVALID,
        'Erro'
      );
      return false;
    }
    return true;
  }

  checkGender() {
    if (this.user?.gender?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.GENDER_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkMaritalStatus() {
    if (!this.user?.maritalStatus?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.MARITAL_STATUS_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkInputMethod() {
    if (!this.user?.inputMethod?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.INPUT_METHOD_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkChurch() {
    if (!this.user?.church?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.CHURCH_INVALID,
        'Erro'
      );
      return false;
    }

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
    if (data) {
      this.day = data.day;
      this.setBirthdate();
    }
  }

  onSetDate(value: any, option: number = 0) {
    if (value) {
      this.user.birthDate = value.substring(0, 10);
    } else {
      if (option === 1) {
        this.user.birthDate = this.date.transform(Date.now(), 'yyyy-MM-dd');
      } else {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        this.user.birthDate = this.date.transform(yesterday, 'yyyy-MM-dd');
      }
    }
  }
}
