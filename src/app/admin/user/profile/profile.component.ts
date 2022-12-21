import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController, AlertController, Platform } from '@ionic/angular';
import { Contact } from 'src/app/models/contact';
import { ConstantMessages } from 'src/app/models/messages';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Church } from 'src/app/models/church';
import { InputMethod } from 'src/app/models/inputhMethod';
import { MaritalStatus } from 'src/app/models/maritalStatus';
import { DayToSelectComponent } from 'src/app/home/home-user-register/register-personal-info/day-to-select/day-to-select.component';
import { ChurchService } from 'src/app/services/church.service';
import { InputMethodService } from 'src/app/services/input-method.service';
import { MaritalStatusService } from 'src/app/services/marital-status.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

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
  maritalStatuses: MaritalStatus[];
  inputMethods: InputMethod[];
  churches: Church[];
  isSmallDevice: boolean;
  days: string[] = [];
  day: string;
  monthYear: string;
  hasBackPage: boolean;
  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private exceptionService: ExceptionService,
    private popCtrl: PopoverController,
    private inputMethodService: InputMethodService,
    private maritalStatusService: MaritalStatusService,
    private platform: Platform,
    private churchService: ChurchService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    if (UiService.localGet(Constants.HAS_BACK_PAGE)) {
      this.hasBackPage = true;
    } else {
      this.hasBackPage = false;
    }

    this.edit = true;
    this.section = 1;
    this.is_loading = true;

    this.isSmallDevice = this.platform.width() <= 500;
    this.load();
  }
  async load() {
    this.user = UiService.localGet(Constants.USER_MAINTAINCE);
    if (!this.user) {
      const response = await this.loginService.loggedUser();
      this.user = response.data;

      this.validUser();
      const inputMethodResponser = await this.inputMethodService.get();
      this.inputMethods = inputMethodResponser.data;

      const maritalResponser = await this.maritalStatusService.get();
      this.maritalStatuses = maritalResponser.data;
      const churchResponser = await this.churchService.get();
      this.churches = churchResponser.data;
    }
    this.is_loading = false;
  }

  checkImageExists() {
    if (this.user?.gender?.toLocaleLowerCase().includes('masculino')) {
      this.localImage = Constants.MALE_PERSON;
    } else {
      this.localImage = Constants.FEMALE_PERSON;
    }
  }

  validUser() {
    this.checkImageExists();
    if (!this.user.contact) {
      this.user.contact = new Contact();
    }

    if (
      !this.user?.image ||
      this.user?.image === Constants.MALE_PERSON ||
      this.user?.image === Constants.FEMALE_PERSON
    ) {
      this.user.image = this.localImage;
      this.is_localImage = true;
    } else {
      this.user.image = this.base_url + this.user?.image;
    }
  }

  setEdit() {
    this.checkImageExists();
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
    if (this.isSmallDevice) {
      this.returnPage.emit({ page: 'more' });
    } else {
      this.returnPage.emit(Constants.MENU_USER_OPTION_MEMBERS);
    }
  }
  segmentChanged(ev) {}

  cancel() {
    this.checkImageExists();
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

  update() {
    this.checkImageExists();
    this.setEdit();
    this.exceptionService.loadingFunction();
    this.userService
      .update(this.user)
      .then((responser) => {
        this.validUser();
        this.edit = true;
      })
      .catch((erro) => {
        this.exceptionService.error(erro.error.message);
      });
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

    if (
      !this.user?.contact?.phone1 ||
      this.user?.contact?.phone1?.length <= 0
    ) {
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

    if (!this.user.birthDate || this.user.birthDate.length < 10) {
      this.exceptionService.alertDialog(
        ConstantMessages.BIRTHDATE_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user.isBaptized) {
      this.exceptionService.alertDialog(
        ConstantMessages.ISBAPTIZED_INVALID,
        'Erro'
      );
      return false;
    }
    if (!this.user.gender) {
      this.exceptionService.alertDialog(
        ConstantMessages.GENDER_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user?.maritalStatus?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.MARITAL_STATUS_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user?.inputMethod?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.INPUT_METHOD_INVALID,
        'Erro'
      );
      return false;
    }

    if (!this.user?.church?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.CHURCH_INVALID,
        'Erro'
      );
      return false;
    }
    return true;
  }

  setIsBaptized(ev: any) {
    this.user.isBaptized = ev.target.value;
    console.log(this.user);
  }
  setGender(ev: any) {
    this.user.gender = ev.target.value;
  }

  setMaritalStatus(ev: any) {
    if (!this.user.maritalStatus) {
      this.user.maritalStatus = new MaritalStatus();
    }
    this.user.maritalStatus.id = ev.target.value;
  }

  setInputMethod(ev: any) {
    if (!this.user.inputMethod) {
      this.user.inputMethod = new InputMethod();
    }
    this.user.inputMethod.id = ev.target.value;
  }

  setChurch(ev: any) {
    if (!this.user.church) {
      this.user.church = new Church();
    }
    this.user.church.id = ev.target.value;
  }

  onSelectData(date: any) {
    this.user.birthDate = date.substring(0, 10);
  }

  onSelectMonth(value: any) {
    this.monthYear = value.substring(0, 7);
    this.setBirthdate();
  }

  setBirthdate() {
    console.clear();
    this.user.birthDate = this.monthYear + '-' + this.day;
    console.log(this.user.birthDate);
  }

  async openDay(ev: any) {
    const pop = await this.popCtrl.create({
      component: DayToSelectComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onDidDismiss();
    console.log(data.day);
    if (data) {
      this.day = data.day;
      this.setBirthdate();
    }
  }
}
