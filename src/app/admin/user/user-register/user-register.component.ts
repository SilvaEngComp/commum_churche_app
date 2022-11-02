import { UiService } from './../../../services/ui.service';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { environment } from '../../../../environments/environment';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ModalController } from '@ionic/angular';
import { User } from '../../../models/user';
import { Contact } from './../../../models/contact';
import { RoleFacadeService } from 'src/app/facades/role-facade.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private usuarioService: UserService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    private roleFacadeService: RoleFacadeService,
    private userFacadeService: UserFacadeService
  ) {}
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
  contacts: Contact[];
  customActionSheetOptions: any = {
    header: 'Parcelamento',
    subHeader: 'Escolha uma parcela',
  };

  email: string;
  phone1: string;
  phone2: string;
  roles: string[];
  ngOnInit() {
    this.active = true;
    if (!this.user) {
      this.user = new User(['customer']);
    }

    this.load();

    this.roleFacadeService.dataLoaded.subscribe((data) => {
      setTimeout(() => {
        this.roles = data;
      }, 1000);
    });
  }

  load() {
    this.roleFacadeService.load();
    if (this.op === 'user-new') {
      this.user = new User([this.role]);
    } else {
      this.user.roles.filter((role) => {});
    }
  }

  onSelectRole(ev) {
    this.user.roles.push(ev.target.value);
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
              UiService.localSet(environment.LOCAL_USER, this.user);
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

    if (this.phone1) {
      this.user.contacts.push(new Contact(this.phone1, 'phone'));
    }
    if (this.phone2) {
      this.user.contacts.push(new Contact(this.phone2, 'phone'));
    }
    if (this.email) {
      this.user.contacts.push(new Contact(this.email, 'email'));
    }
    return true;
  }
}
