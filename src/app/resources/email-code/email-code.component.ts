import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-email-code',
  templateUrl: './email-code.component.html',
  styleUrls: ['./email-code.component.scss'],
})
export class EmailCodeComponent implements OnInit {
  @Output() responseReturn: EventEmitter<any> = new EventEmitter<any>();

  erro: boolean;
  email: string;

  typePassword: string;
  show: boolean;
  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService
  ) { }

  ngOnInit() {
    this.email = '';
    this.erro = false;
    this.typePassword = 'password';
  }

  async send() {
    if (this.email.length <= 0) {
      this.exceptionService.toastHandler('insira um email');
      return;
    }
    this.exceptionService.loadingFunction();
    // Enviando o email para recupeação de senha
    this.loginService
      .recorverAccess(this.email)
      .then(async () => {
        this.responseReturn.emit({ email: this.email });
      })
      .catch((erro) => {
        this.exceptionService.error(erro);
      });

    // popover para inserir o código de recuperação
  }

  haveCode() {
    UiService.pageMenu.emit({ page: 'valid-code' });
  }
  back() {
    UiService.pageMenu.emit({ page: UiService.localGet('callbackPage') });

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
