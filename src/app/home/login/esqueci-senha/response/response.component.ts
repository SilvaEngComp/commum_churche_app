import { ViewChild } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { PopoverController, ModalController, IonInput } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { AlterarSenhaComponent } from '../alterar-senha/alterar-senha.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnInit {
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
    this.selectedPage.emit(0);
  }

  resend() {
    if (this.email) {
      this.exceptionService.loadingFunction();
      this.loginService.recorverAccess(this.email).then((response) => {
        this.exceptionService.success(response);
      });
    }
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
        .then(async (user) => {
          this.selectedPage.emit(0);
        })
        .catch((error) => {
          this.cod = '';
          this.error = true;
          this.exceptionService.error(error);
        });
    }
  }
}
