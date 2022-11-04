import { Constants } from 'src/app/models/constants';
import { AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IonInput,
  PopoverController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { Contact } from 'src/app/models/contact';
import { ConstantMessages } from 'src/app/models/messages';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  today: string;
  is_loading: boolean;
  base_url: string = environment.IMAGE_URL;
  user: User;
  userAux: User;
  op: string;
  edit: boolean;
  is_localImage: boolean;
  selectedCard: string;
  // public fGroup: FormGroup;
  cpfValid = true;
  haveParcela: boolean;
  validade: string;
  options: any = {
    header: 'selecione',
  };
  ativo: boolean;
  section: number;
  localImage: string;
  genders: string[] = ['MASCULINO', 'FEMININO'];
  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private exceptionService: ExceptionService
  ) {}
  ngAfterViewInit(): void {
    if (!this.user?.image) {
      this.user.image = this.localImage;
      this.is_localImage = true;
    } else {
      this.user.image = this.base_url + this.user?.image;
    }
  }

  ngOnInit() {
    this.edit = true;
    this.section = 1;

    this.user = LoginService.getUser();
    if (this.user?.gender.toLocaleLowerCase().includes('masculino')) {
      this.localImage = Constants.MALE_PERSON;
    } else {
      this.localImage = Constants.FEMALE_PERSON;
    }

    const date = new DatePipe('en');

    this.today = date.transform(Date.now(), 'yyyy-MM-dd');
    console.log(this.user);
  }

  setEdit() {
    this.edit = !this.edit;
    localStorage.setItem(
      environment.LOCALSTORAGE + 'edit',
      JSON.stringify(this.edit)
    );
  }

  onSetBrmaskers(ev, op: number) {
    switch (op) {
      case 1:
        this.user.contact.phone1 = ev.target.value;
        break;
      case 2:
        this.user.contact.phone2 = ev.target.value;
        break;
      case 3:
        this.user.gender = ev.target.value;
        break;
      case 4:
        this.user.birthDate = ev.target.value.substr(0, 10);
        break;
    }
  }

  async back() {
    this.returnPage.emit({ page: 'more' });
  }
  segmentChanged(ev) {}
  cancel() {
    this.edit = !this.edit;
    this.user = this.userAux;
  }
  onSelectGender(ev: any) {
    this.user.gender = ev.target.value;
  }

  checkCep(cep: any) {
    if (cep.length === 9) {
      this.user.contact.postalcode = cep;
      this.userService
        .consultaCep(cep.replace(/[^\d]+/g, ''))
        .then((response) => {
          this.user.contact.city = response.localidade;
          this.user.contact.state = response.uf;
        });
    }
  }

  async setImage() {
    this.returnPage.emit({
      page: 'load-image',
      callbackPage: 'profile',
    });
  }

  onSetAddress(ev: any, op: number) {
    if (!this.user.contact) {
      this.user.contact = new Contact();
    }
    if (op === 1) {
      this.user.contact.street = ev.target.value;
    } else if (op === 2) {
      this.user.contact.hauseNumber = ev.target.value;
    } else if (op === 3) {
      this.user.contact.district = ev.target.value;
    } else if (op === 4) {
      this.user.contact.complement = ev.target.value;
    } else if (op === 5) {
      this.user.contact.city = ev.target.value;
    } else if (op === 6) {
      this.user.contact.state = ev.target.value;
    } else if (op === 7) {
      this.user.contact.country = ev.target.value;
    }
  }
  async deleteImage() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      message:
        'TODOS OS DADOS RELACIONADOS A ESSE PROFESSOR SERÃO DELETADOS. DESEJA CONTINUAR? ',
      mode: 'ios',
      buttons: [
        {
          text: 'SIM',
          handler: () => {
            this.userService.deleteImage(this.user).then((user) => {
              this.user = user;
              this.exceptionService.toastHandler(
                'Usuário deletado com sucesso!'
              );
            });
          },
        },
        {
          text: 'NÃO',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  onSubmit() {
    if (!this.checkPersonalInfo()) {
      return false;
    }

    if (!this.checkContact()) {
      return false;
    }

    return true;
  }

  finish() {
    if (this.onSubmit()) {
      this.setEdit();

      this.exceptionService.openLoading('agradecemos!');
      this.userService
        .update(this.user)
        .then((responser) => {
          const token = LoginService.getToken();
          token.user = responser.data;
          LoginService.setToken(token);
          this.edit = true;
        })
        .catch((erro) => {
          this.exceptionService.error(erro.error.message);
        });
    }
  }

  checkContact() {
    console.log(this.user);
    if (!this.user.contact.street || this?.user?.contact?.street?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.STREET_INVALID,
        'Erro'
      );
      return false;
    }

    if (
      !this.user.contact.district ||
      this.user?.contact?.district?.length <= 0
    ) {
      this.exceptionService.alertDialog(
        ConstantMessages.DISTRICT_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkPersonalInfo() {
    if (this.user.name.length <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    }

    const nome: string[] = this.user.name.split(' ');
    if (nome.length < 2) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    } else {
      if (nome[0].length <= 0 || nome[1].length <= 0) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID,
          'Erro'
        );
        return false;
      }
    }
    console.log(this.user?.contact?.phone1);
    if (this.user?.contact?.phone1?.length <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.PHONE_INVALID, 'Erro');
      return false;
    } else {
      if (this?.user?.contact?.phone1) {
        this.user.contact.phone1 = this.user.contact.phone1.replace(
          /[^\d]+/g,
          ''
        );
      }
    }
    if (!this.user.birthDate) {
      this.exceptionService.alertDialog(
        ConstantMessages.BIRTHDATE_INVALID,
        'Erro'
      );
      return false;
    }
    return true;
  }
}
