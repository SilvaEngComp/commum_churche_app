import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-request-email',
  templateUrl: './request-email.component.html',
  styleUrls: ['./request-email.component.scss'],
})
export class RequestEmailComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();

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
        this.router.navigate(['admin']);
      })
      .catch((error) => {
        this.exceptionService.error(error);
      });
  }

  async recoverPasswordd() {
    this.selectedPage.emit(1);
  }
}
