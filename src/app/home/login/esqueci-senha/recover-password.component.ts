import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RevoverPasswordComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();
  erro: boolean;
  email: string;

  typePassword: string;
  show: boolean;
  constructor(
    private exceptionService: ExceptionService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.email = '';
    this.erro = false;
    this.typePassword = 'password';
  }

  async backPage() {
    this.selectedPage.emit(Constants.PAGE_REQUEST_EMAIL);
  }

  async sendRequest() {
    if (this.email.length <= 0) {
      this.exceptionService.toastHandler('insira um email');
      return;
    }
    this.exceptionService.loadingFunction();
    // Enviando o email para recupeação de senha
    this.loginService
      .recoverAccess(this.email)
      .then(async () => {
        const user = new User();
        user.email = this.email;
        UiService.localSet(Constants.RECOVER_USER, user);
        this.codeValidation();
      })
      .catch((erro) => {
        this.exceptionService.error(erro);
      });
  }

  codeValidation() {
    this.selectedPage.emit(Constants.PAGE_CODE_VALIDATION);
  }

  showPassword() {
    this.show = !this.show;
    if (this.show) {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }
}
