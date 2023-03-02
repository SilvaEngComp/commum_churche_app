/* eslint-disable @typescript-eslint/naming-convention */
import { LoginService } from 'src/app/services/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-valid-code',
  templateUrl: './valid-code.component.html',
  styleUrls: ['./valid-code.component.scss'],
})
export class ValidCodeComponent implements OnInit {
  @Output() responseReturn: EventEmitter<any> = new EventEmitter<any>();
  email: string;
  is_invitation: boolean;
  cod: string;
  cod2: string[] = ['', '', '', '', '', ''];
  error: boolean;
  is_validing: boolean;
  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.error = false;
    this.cod = '';
    if (UiService.localGet('email')) {
      this.email = UiService.localGet('email');
    }
    if (UiService.localGet('register-invitation')) {
      this.is_invitation = UiService.localGet('register-invitation');
    }

    console.log(this.is_invitation);
  }

  clear() {
    this.cod = '';
    this.cod2 = [];
  }
  back() {
    UiService.pageMenu.emit({ page: UiService.localGet('callbackPage') });
  }

  toString() {
    this.cod = '';
    this.cod2.filter((l) => {
      this.cod += l;
    });
  }
  resend() {
    if (this.email) {
      this.exceptionService.loadingFunction();
      this.loginService
        .recoverAccess(this.email)
        .then((responser) => {
          this.exceptionService.success(responser);
        })
        .catch((error) => this.exceptionService.error(error))
        .finally(() => (this.is_validing = false));
    }
  }

  checkCod(id: number, value: any, input: IonInput) {
    if (value.length > 0) {
      if (id === 0 && value.length === 6) {
        this.cod2 = value.split('');
      } else if (this.cod2[id].length < 6) {
        this.cod2[id] = value;
        input.setFocus();
      }

      // console.log(this.cod2);
      this.toString();
      if (this.cod.length >= 6) {
        this.is_validing = true;

        this.loginService
          .validCod(this.cod, this.is_invitation)
          .then(async (responser) => {
            this.exceptionService.success(responser);
            this.responseReturn.emit({ valid: true, user: responser.data });
          })
          .catch((e) => this.exceptionService.error(e))
          .finally(() => (this.is_validing = false));
      }
    }
  }
}
