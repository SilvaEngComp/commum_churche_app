/* eslint-disable @typescript-eslint/no-shadow */
import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { Input } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  PopoverController,
  AlertController,
  Platform,
  ActionSheetController,
} from '@ionic/angular';
import { Contact } from 'src/app/models/contact';
import { ConstantMessages } from 'src/app/models/messages';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Church } from 'src/app/models/church';
import { InputMethod } from 'src/app/models/inputhMethod';
import { MaritalStatus } from 'src/app/models/maritalStatus';
import { ChurchService } from 'src/app/services/church.service';
import { InputMethodService } from 'src/app/services/input-method.service';
import { MaritalStatusService } from 'src/app/services/marital-status.service';
import { DayToSelectComponent } from 'src/app/resources/day-to-select/day-to-select.component';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { UserRole } from 'src/app/models/userRole';
import { DatePipe } from '@angular/common';
import { Responser } from 'src/app/models/responser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() hasBackPage: boolean;
  is_loading: boolean;
  user: User;
  userAux: User;
  op: string;
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
  roles: UserRole[];
  isImageButtonVisible = false;
  showLoadEditImage = false;
  date: DatePipe;
  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private exceptionService: ExceptionService,
    private popCtrl: PopoverController,
    private inputMethodService: InputMethodService,
    private maritalStatusService: MaritalStatusService,
    private platform: Platform,
    private churchService: ChurchService,
    private loginService: LoginService,
    private actionCtrl: ActionSheetController,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_USER_PROFILE
    );

    UiService.pageTitle.emit(Constants.TITLE_USER_PROFILE);

    console.log('entrei profile');
    this.section = 1;
    this.is_loading = true;

    this.isSmallDevice = this.platform.width() <= 500;
    this.load();
  }
  async load() {
    this.user = UiService.localGet(Constants.USER_MAINTAINCE);
    if (!this.user) {
      this.loginService
        .loggedUser()
        .then((response) => {
          this.user = response.data;

          this.validUser();
        })
        .catch((error) => this.exceptionService.error(error));
    }

    const inputMethodResponser = await this.inputMethodService.get();
    this.inputMethods = inputMethodResponser.data;
    const maritalResponser = await this.maritalStatusService.get();
    this.maritalStatuses = maritalResponser.data;
    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;

    const roleResponser = await this.roleService.get();
    this.roles = roleResponser.data;
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
    }
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

  cancel() {
    this.checkImageExists();
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

  setShowEditImageButtons() {
    this.isImageButtonVisible = !this.isImageButtonVisible;
  }
  setshowLoadEditImage() {
    this.showLoadEditImage = !this.showLoadEditImage;
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

  receiveSubpage(obj: any) {
    if (obj) {
      this.userService
        .upload(obj.files.formData, this.user)
        .then((responser) => {
          this.user = responser.data;

          this.validUser();
          UiService.localSet(Constants.USER_MAINTAINCE, this.user);
          LoginService.updateUserToken(this.user, true);
        });
    }
    this.showLoadEditImage = false;
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
            this.userService.deleteImage(this.user).then((responser) => {
              this.user = responser?.data;
              console.log(this.user);
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

  update() {
    this.is_loading = true;
    if (this.checkUpdateValid()) {
      const currentUser = LoginService.getUser();
      let difference_a1: string[] = [];
      if (this.user?.id === currentUser?.id) {
        difference_a1 = this?.user?.roles.filter(
          (x) => !currentUser?.roles?.includes(x)
        );
      }
      console.log(difference_a1);
      this.userService
        .update(this.user)
        .then((responser: Responser) => {
          this.exceptionService.alertDialog('Alteração realizada com sucesso');

          if (difference_a1?.length <= 0) {
            this.user = responser.data;
            LoginService.setUser(this.user);
          } else {
            LoginService.setToken(responser);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
          this.validUser();
          if (this.hasBackPage) {
            this.returnPage.emit(this.user);
          }
        })
        .catch((erro) => {
          this.exceptionService.error(erro);
        })
        .finally(() => (this.is_loading = false));
    } else {
      this.is_loading = false;
    }
  }
  checkUpdateValid() {
    if (!this.checkName()) {
      return;
    } else if (!this.checkPhone()) {
      return;
    } else if (!this.checkBirthday()) {
      return;
    } else if (!this.checkGender()) {
      return;
    } else if (!this.checkIsBaptized()) {
      return;
    } else if (!this.checkMaritalStatus()) {
      return;
    } else if (!this.checkInputMethod()) {
      return;
    } else if (!this.checkChurch()) {
      return;
    }

    return true;
  }

  checkPhone() {
    if (
      !this.user?.contact?.phone1 ||
      this.user?.contact?.phone1?.length < 10
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
    return true;
  }

  checkName() {
    if (!this?.user?.name) {
      this.exceptionService.alertDialog(ConstantMessages.NAME_INVALID, 'Erro');
      return false;
    } else {
      const regex = new RegExp(/^[A-Za-z\s]*$/g);
      if (!regex.test(this?.user?.name)) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID_NOT_LETTERS,
          'Erro'
        );
        return false;
      }

      const validName: string[] = this?.user?.name?.split(' ');
      if (validName?.length < 2) {
        this.exceptionService.alertDialog(
          ConstantMessages.NAME_INVALID,
          'Erro'
        );
        return false;
      } else {
        let name = '';
        validName.filter((text) => {
          text = text.replace(/[^aA-zZ]+/g, '');
          name += text + ' ';
        });

        if (validName[0]?.length <= 0 || validName[1]?.length <= 0) {
          this.exceptionService.alertDialog(
            ConstantMessages.NAME_INVALID_SPACE,
            'Erro'
          );
          return false;
        }

        const regex = new RegExp(/[aA-zZ]+[\s]+[aA-zZ]+/g);
        if (!regex.test(name)) {
          this.exceptionService.alertDialog(
            ConstantMessages.NAME_INVALID_NOT_LETTERS,
            'Erro'
          );
          return false;
        }

        this.user.name = name;
      }
    }
    return true;
  }

  checkBirthday() {
    if (!this?.user?.birthDate || this?.user?.birthDate?.length < 10) {
      this.exceptionService.alertDialog(
        ConstantMessages.BIRTHDATE_INVALID,
        'Erro'
      );
      return false;
    }
    return true;
  }

  checkIsBaptized() {
    if (!this?.user?.isBaptized) {
      this.exceptionService.alertDialog(
        ConstantMessages.ISBAPTIZED_INVALID,
        'Erro'
      );
      return false;
    }
    return true;
  }

  checkGender() {
    if (this.user?.gender?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.GENDER_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkMaritalStatus() {
    if (!this.user?.maritalStatus?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.MARITAL_STATUS_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkInputMethod() {
    if (!this.user?.inputMethod?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.INPUT_METHOD_INVALID,
        'Erro'
      );
      return false;
    }

    return true;
  }

  checkChurch() {
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
    this.maritalStatuses.filter((obj) => {
      if (obj.id === ev.target.value) {
        this.user.maritalStatus = obj;
      }
    });
  }

  setInputMethod(ev: any) {
    if (!this.user.inputMethod) {
      this.user.inputMethod = new InputMethod();
    }
    this.inputMethods.filter((obj) => {
      if (obj.id === ev.target.value) {
        this.user.inputMethod = obj;
      }
    });
  }

  setChurch(ev: any) {
    if (!this.user.church) {
      this.user.church = new Church();
    }
    this.churches.filter((obj) => {
      if (obj.id === ev.target.value) {
        this.user.church = obj;
      }
    });
  }

  setRole(ev: any) {
    this.user.roles = ev.target.value;
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

  onSetDate(value: any, option: number = 0) {
    if (value) {
      this.user.birthDate = value.substring(0, 10);
    } else {
      if (option === 1) {
        this.user.birthDate = this.date.transform(Date.now(), 'yyyy-MM-dd');
      } else {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        this.user.birthDate = this.date.transform(yesterday, 'yyyy-MM-dd');
      }
    }
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

  async imageOptions() {
    const action = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Alterar',
          handler: () => {
            this.setshowLoadEditImage();
          },
        },
        {
          text: 'Deletar',
          role: 'delete',
          handler: () => {
            this.deleteImage();
          },
        },
      ],
    });
    action.present();
  }

  async deleteAccount() {
    const user = LoginService.getUser();

    const alert = await this.alertCtrl.create({
      message:
        'Tem certeza que deseja exlcuir completamente sua conta ' +
        user.name +
        '?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {},
        },
        {
          text: 'Ok',
          cssClass: 'success',
          handler: () => {
            this.userService
              .delete(user)
              .then(() => {
                localStorage.clear();
                this.router.navigate(['home']);
              })
              .catch((error) => this.exceptionService.error(error));
          },
        },
      ],
    });

    await alert.present();
  }
}
