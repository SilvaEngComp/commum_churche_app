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
import { IonDatetime } from '@ionic/angular';
import { MaritalStatus } from 'src/app/models/maritalStatus';

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
  @ViewChild('timeMonthYear', { static: false }) timeMonthYear: IonDatetime;
  today: string;
  maritalStatuses: MaritalStatus[];
  inputMethods: InputMethod[];
  constructor(
    private exceptionService: ExceptionService,
    private inputMethodService: InputMethodService,
    private maritalStatusService: MaritalStatusService
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
  }

  async load() {
    const inputMethodResponser = await this.inputMethodService.get();
    this.inputMethods = inputMethodResponser.data;

    console.log(this.inputMethods);

    const maritalResponser = await this.maritalStatusService.get();
    this.maritalStatuses = maritalResponser.data;
    console.log(this.maritalStatuses);
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

  save() {
    UiService.localSet(Constants.REGISTRING_USER, this.user);
  }

  setSession(session: number) {
    const lastSession = UiService.localGet(Constants.CURRENT_REGISTER_SESSION);
    let flag = true;
    if (lastSession < session) {
      if (!this.check()) {
        flag = false;
      }
    }
    if (flag) {
      this.save();
      this.session.emit(session);
    }
  }

  check() {
    if (this.user.name.length <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    }
    if (!this.user?.maritalStatus?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.MARITAL_STATUS_INVALID,
        'Erro'
      );
      return false;
    }
    console.log(this.user.inputMethod);

    if (!this.user?.inputMethod?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.INPUT_METHOD_INVALID,
        'Erro'
      );
      return false;
    }

    const nome: string[] = this.user.name.split(' ');
    if (nome.length < 2) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    } else {
      if (nome[0].length <= 0 || nome[1].length <= 0) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID,
          'Erro'
        );
        return false;
      }
    }
    if (this.user?.contact?.phone1?.length <= 0) {
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
    if (!this.user.birthDate) {
      this.exceptionService.alertDialog(
        ConstantMessages.BIRTHDATE_INVALID,
        'Erro'
      );
      return false;
    }
    this.save();
    return true;
  }
}
