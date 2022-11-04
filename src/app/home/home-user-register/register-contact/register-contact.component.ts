import { ExceptionService } from 'src/app/services/exception-service.service';
import { Constants } from 'src/app/models/constants';
import { UiService } from './../../../services/ui.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { IonCheckbox } from '@ionic/angular';
import { ConstantMessages } from 'src/app/models/messages';

@Component({
  selector: 'app-register-contact',
  templateUrl: './register-contact.component.html',
  styleUrls: ['./register-contact.component.scss'],
})
export class RegisterContactComponent implements OnInit {
  @Output() session: EventEmitter<number> = new EventEmitter<number>();
  user: User;
  thereIsNotNumber: boolean;
  typeNumber: string;
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    this.thereIsNotNumber = false;
    this.typeNumber = 'number';
    this.user = UiService.localGet(Constants.REGISTRING_USER);
    if (!this.user) {
      this.user = new User();
      this.save();
    }
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
    console.log(this.user);
    if (!this.user.contact.street || this?.user?.contact?.street?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.STREET_INVALID,
        'Erro'
      );
      return false;
    }

    if (
      !this.user.contact.district ||
      this.user?.contact?.district?.length <= 0
    ) {
      this.exceptionService.alertDialog(
        ConstantMessages.DISTRICT_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  setNotNumber(check: IonCheckbox) {
    if (!check.checked) {
      this.thereIsNotNumber = false;
      this.user.contact.hauseNumber = '';
      this.typeNumber = 'number';
    } else {
      this.typeNumber = 'text';
      this.user.contact.hauseNumber = 'S/N';
      this.thereIsNotNumber = true;
    }

    this.save();
  }
}
