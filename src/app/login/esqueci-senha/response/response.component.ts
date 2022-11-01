/* eslint-disable @typescript-eslint/member-ordering */
import { PopoverController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { AlterarSenhaComponent } from '../alterar-senha/alterar-senha.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnInit {

  @Input() email: string;
  constructor(
    private loginService: LoginService,
    private popCtrl: PopoverController,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    ) { }

  cod: string;

  ngOnInit() {}
  option(op: number){
    switch (op){
      case 1:
        this.cod = '';
        this.exceptionService.loadingFunction();
        this.loginService.esqueciSenha(this.email);
      break;

      case 2:
       this.popCtrl.dismiss();
       break;
    }
  }

  checkCod() {
    if (this.cod.length >= 6) {
      this.exceptionService.loadingFunction();
      this.loginService.checkCod(this.cod).then(
        async (user) => {
          const modal = await this.modalCtrl.create({
            component: AlterarSenhaComponent,
            componentProps: ({ user })
          });

          await modal.present();

          const { data } = await modal.onDidDismiss();

          let status = false;
          if (data) {
            status = data.status;
          }
          this.popCtrl.dismiss(
            {
              status
            }
          );
        }
      ).catch(
        (erro) => this.exceptionService.erro(erro)
      );
    }
   }


}
