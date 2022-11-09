import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { ViewChild } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { IonInput } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-code-validation',
  templateUrl: './code-validation.component.html',
  styleUrls: ['./code-validation.component.scss'],
})
export class CodeValidationComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('inputZero', { static: false }) inputZero: IonInput;
  @Input() email: string;
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
  }

  back() {
    this.selectedPage.emit(Constants.PAGE_LOGIN);
  }

  resend() {
    this.exceptionService.loadingFunction();
    const user = UiService.localGet(Constants.RECOVER_USER);
    this.loginService.recorverAccess(user.email).then((response) => {
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

  checkCod(id: number, ev) {
    if (id === 0 && ev.target.value.length > 1) {
      this.cod2 = ev.target.value.split('');
    } else {
      this.cod2[id] = ev.target.value;
    }

    this.toString();
    console.log(this.cod2[0]);
    if (this.cod.length >= 6) {
      this.loginService
        .checkCod(this.cod)
        .then(async (response) => {
          console.log(response);
          UiService.localSet(Constants.RECOVER_USER, response.data);
          this.selectedPage.emit(Constants.PAGE_UPDATE_PASSWORD);
        })
        .catch((error) => {
          this.cod = '';
          this.error = true;
          this.exceptionService.error(error);
        });
    }
  }
}
