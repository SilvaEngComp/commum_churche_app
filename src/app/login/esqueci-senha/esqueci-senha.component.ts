import { ResponseComponent } from './response/response.component';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent implements OnInit {

  erro: boolean;
  email: string;

  typePassword: string;
  show: boolean;
  constructor(
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    private popCtrl: PopoverController,
    private loginService: LoginService,
        ) {}

  ngOnInit() {
    this.email = '';
    this.erro = false;
    this.typePassword = 'password';
  }

  async esqueciSenha(){
    if (this.email.length <= 0){
      this.exceptionService.toastHandler('insira um email');
      return;
    }
    this.exceptionService.loadingFunction();
    // Enviando o email para recupeação de senha
    this.loginService.esqueciSenha(this.email).then(
      async () => {
          // popover para inserir o código de recuperação
    const modal = await this.popCtrl.create({
      component: ResponseComponent,
      componentProps: ({email: this.email}),
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

         let status = false;
         if (data) {
           status = data.status;
         }

      this.modalCtrl.dismiss(
           {
             status
           }
         );
      }
    ).catch(
      (erro) => {
        this.exceptionService.erro(erro);
      });


    }

  back(){
    this.modalCtrl.dismiss();
  }
  showPassword(){
    this.show  = !this.show;
    if (this.show){
      this.typePassword = 'text';
    }else{
      this.typePassword = 'password';
    }
  }
}
