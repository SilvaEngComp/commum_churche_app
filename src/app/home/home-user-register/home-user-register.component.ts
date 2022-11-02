/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoleFacadeService } from 'src/app/facades/role-facade.service';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { Constants } from 'src/app/models/constants';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-user-register',
  templateUrl: './home-user-register.component.html',
  styleUrls: ['./home-user-register.component.scss'],
})
export class HomeUserRegisterComponent implements OnInit {
  base_url: string = environment.IMAGE_URL;
  @Input() user: User;
  @Input() op: string;
  @Input() role: string;
  @Input() isOrderCustomer: boolean;

  selectedRole: string;
  haveParcela: boolean;
  validade: string;
  active: boolean;
  iscliente: boolean;
  havCardAccess: boolean;
  contact: Contact;
  customActionSheetOptions: any = {
    header: 'Parcelamento',
    subHeader: 'Escolha uma parcela',
  };

  email: string;
  phone1: string;
  phone2: string;
  roles: string[];

  constructor(
    private usuarioService: UserService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    private roleFacadeService: RoleFacadeService,
    private userFacadeService: UserFacadeService
  ) {}

  ngOnInit() {
    this.active = true;
    this.user = new User();
    console.log(this.user);
  }

  cancelar() {
    this.modalCtrl.dismiss({
      user: this.user,
    });
  }

  async onSelectstring(ev: any) {
    this.user.roles = ev.target.value;
  }

  register() {
    if (this.check()) {
      this.exceptionService.loadingFunction();

      if (this.op === 'user-new') {
        this.usuarioService
          .store(this.user)
          .then((responser) => {
            this.user = responser.data;
            if (this.isOrderCustomer) {
              UiService.localSet(Constants.LOCAL_USER, this.user);
            }
            this.exceptionService.success(responser);
            this.cancelar();
          })
          .catch((erro) => {
            this.exceptionService.error(erro);
          });
      } else {
        this.usuarioService
          .update(this.user)
          .then((responser) => {
            this.user = responser.data;
            this.exceptionService.success(responser);
            this.cancelar();
          })
          .catch((erro) => {
            this.exceptionService.error(erro);
          });
      }
    }
  }

  check() {
    if (this.user.name.length <= 0) {
      this.exceptionService.alertDialog(
        'Insira um nome válido (Nome e sobrenome',
        'Erro'
      );
      return false;
    }

    const nome: string[] = this.user.name.split(' ');
    if (nome.length < 2) {
      this.exceptionService.alertDialog(
        'Insira um nome válido (Nome e sobrenome',
        'Erro'
      );
      return false;
    }

    if (!this.user.roles) {
      this.user.roles = ['customer'];
    }

    return true;
  }
}
