import { ConstantMessages } from './../../../../models/messages';
import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { ViewChild } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { IonInput } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-code-validation',
  templateUrl: './code-validation.component.html',
  styleUrls: ['./code-validation.component.scss'],
})
export class CodeValidationComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('inputZero', { static: false }) inputZero: IonInput;
  user: User;
  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService
  ) {}

  cod: string;
  cod2: string[] = ['', '', '', '', '', ''];
  error: boolean;

  ngOnInit() {
    this.error = false;
    this.cod = '';
    this.user = UiService.localGet(Constants.RECOVER_USER);
    if (!this.user) {
      localStorage.clear();
      this.cancel();
    }
  }
  cancel() {
    this.exceptionService.alertDialog(ConstantMessages.ENDED_SESSION);
    this.selectedPage.emit(Constants.PAGE_LOGIN);
  }

  async backPage() {
    this.selectedPage.emit(Constants.PAGE_REQUEST_EMAIL);
  }

  resendEmail() {
    this.exceptionService.loadingFunction();
    const user = UiService.localGet(Constants.RECOVER_USER);
    this.loginService.recoverAccess(user.email).then((response) => {
      this.exceptionService.success(response);
      this.cod2 = ['', '', '', '', '', ''];
      this.cod = '';
    });
  }

  toString() {
    this.cod = '';
    this.cod2.filter((l) => {
      this.cod += l;
    });
  }

  checkCod(id: number, ev, current: IonInput, next: IonInput) {
    if (ev.target.value.length > 1) {
      this.cod2 = [];
      this.cod2 = ev.target.value.split('');
    } else {
      this.cod2[id] = ev.target.value;
    }

    this.toString();
    current.value = this.cod[id];
    if (!next.autofocus && current.value.length === 1) {
      next.setFocus();
    }
    if (this.cod.length >= 6) {
      this.sendCode();
    }
  }

  sendCode() {
    this.loginService
      .checkCod(this.cod)
      .then(async (response) => {
        UiService.localSet(Constants.RECOVER_USER, response.data);
        this.selectedPage.emit(Constants.PAGE_UPDATE_PASSWORD);
      })
      .catch((error) => {
        this.error = true;
        this.exceptionService.error(error);
      })
      .finally(() => {
        this.cod = '';
      });
  }
}
