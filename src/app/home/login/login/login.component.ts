import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/models/constants';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();

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
      .then((token) => {
        console.clear();
        LoginService.setToken(token);
        this.exceptionService.wellcome();

        setTimeout(() => {
          this.router.navigate(['admin']);
        }, 1000);
      })
      .catch((error) => {
        this.exceptionService.error(error);
      });
  }

  recoverPassword() {
    this.selectedPage.emit(1);
  }

  goToRegister() {
    this.selectedPage.emit(Constants.MENU_HOME_USER_REGISTRATION_BY_LOGIN);
  }
}
