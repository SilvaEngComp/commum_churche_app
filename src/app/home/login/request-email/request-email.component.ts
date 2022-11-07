import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { EsqueciSenhaComponent } from '../esqueci-senha/esqueci-senha.component';

@Component({
  selector: 'app-request-email',
  templateUrl: './request-email.component.html',
  styleUrls: ['./request-email.component.scss'],
})
export class RequestEmailComponent implements OnInit {
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
  constructor(
    private exceptionService: ExceptionService,
    private loginService: LoginService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}
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
        this.exceptionService.error(error);
      });
  }

  async esqueciSenha() {
    const modal = await this.modalCtrl.create({
      component: EsqueciSenhaComponent,
      cssClass: 'modal-model',
    });

    await modal.present();
  }
}
