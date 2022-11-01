/* eslint-disable @typescript-eslint/member-ordering */
import { LoginService } from 'src/app/services/login.service';
import { ModalController } from '@ionic/angular';
import { ExceptionService } from '../services/exception-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private exceptionService: ExceptionService,
    private loginService: LoginService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  newParte: number;
  show: boolean;
  action: string;
  user: User;
  email: string;
  password: string;

  //variáveis de validações
  activationCode: string;
  cpfValid: boolean;
  flag: number;

  ngOnInit() {
    this.password = 'password';
    this.show = false;
    this.user = new User();
  }

  showPassword() {
    this.show = !this.show;
    if (this.show) {
      this.password = 'text';
    } else {
      this.password = 'password';
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  login() {
    this.exceptionService.loadingFunction();
    this.loginService
      .login(this.user.email, this.user.password)
      .then(async (token) => {
        console.log(token);
        LoginService.setToken(token);
        this.router.navigate(['admin']);
      })
      .catch((error) => {
        this.exceptionService.erro(error);
      });
  }

  async esqueciSenha() {
    const modal = await this.modalCtrl.create({
      component: EsqueciSenhaComponent,
    });

    await modal.present();
  }

  // validaEmail() {
  //   if (this.user.contato.email.indexOf('@') === -1) {
  //     this.exceptionService.alertDialog('Esse Email não é válido. Falta o caracter @', 'Erro')
  //     return false;
  //   }

  //   if (this.user.contato.email.length <= 10) {
  //     this.exceptionService.alertDialog('Esse Email não é válido.', 'Erro')

  //     return false;
  //   } else {
  //     const servidor: string[] = this.user.contato.email.split('@');
  //     if (servidor[0].length < 1 || servidor[1].length < 9) {
  //     this.exceptionService.alertDialog('Esse Email não é válido.', 'Erro')
  //     return false;
  //     }

  //   }

  //   return true;
  // }
}
