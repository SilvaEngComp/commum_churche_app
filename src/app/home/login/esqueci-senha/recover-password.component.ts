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
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_PASSWORD_RESTORE_PAGE
    );
    UiService.pageTitle.emit(Constants.TITLE_PASSWORD_RESTORE_PAGE);
    this.email = '';
    this.erro = false;
    this.typePassword = 'password';
  }

  async backPage() {
    this.selectedPage.emit(Constants.PAGE_LOGIN);
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
        this.exceptionService.alertDialog(
          'Um código foi enviado. Verifique seu email',
          'Código enviado!'
        );
        const user = new User();
        user.email = this.email;
        UiService.localSet(Constants.RECOVER_USER, user);
        this.codeValidation();
      })
      .catch((erro) => {
        this.exceptionService.error(erro);
      });
  }

  save() {
    UiService.localSet(Constants.LOCALSTORAGE_REQUEST_EMAIL, this.email);
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

  goToRegister() {
    this.selectedPage.emit(Constants.MENU_HOME_USER_REGISTRATION_BY_LOGIN);
  }
}
