import { ResponseComponent } from './response/response.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();
  erro: boolean;
  email: string;

  typePassword: string;
  show: boolean;
  constructor(
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    private popCtrl: PopoverController,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.email = '';
    this.erro = false;
    this.typePassword = 'password';
  }

  async backPage() {
    this.selectedPage.emit(1);
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
        this.codeValidation();
      })
      .catch((erro) => {
        this.exceptionService.error(erro);
      });
  }

  codeValidation() {
    this.selectedPage.emit(2);
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
