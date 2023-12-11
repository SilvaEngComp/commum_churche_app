import { UserService } from '../../../../services/user.service';
import { ExceptionService } from '../../../../services/exception-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { ConstantMessages } from 'src/app/models/messages';
import { UiService } from 'src/app/services/ui.service';
import { DatePipe } from '@angular/common';
import { Church } from 'src/app/models/church';
import { ChurchService } from 'src/app/services/church.service';

@Component({
  selector: 'app-emergency-user-register',
  templateUrl: './emergency-user-register.component.html',
  styleUrls: ['./emergency-user-register.component.scss'],
})
export class EmergencyUserRegisterComponent implements OnInit {
  @Input() apiResponse: User[];
  user: User;
  days: string[] = [];
  day: string;
  monthYear: string;
  churches: Church[];
  constructor(
    private exceptionService: ExceptionService,
    private userService: UserService,
    private popCtrl: PopoverController,
    private churchService: ChurchService
  ) {}

  ngOnInit() {
    this.user = new User();
    const datePipe = new DatePipe('en');
    this.user.birthDate = datePipe.transform(Date.now(), 'yyyy-mm-dd');
    this.load();
  }

  async load() {
    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;
  }

  setChurch(ev: any) {
    if (!this.user.church) {
      this.user.church = new Church();
    }
    this.user.church.id = ev.target.value;
  }
  register() {
    if (!this.userIsAlreadyRegistred()) {
      if (this.validForm()) {
        this.exceptionService.loadingFunction();

        this.userService
          .emergencialStore(this.user)
          .then((responser) => {
            this.user = responser.data;
            this.close();
          })
          .catch((erro) => {
            this.exceptionService.error(erro);
          });
      }
    } else {
      this.close();
    }
  }

  validForm() {
    if (!this.user?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    if (!this.user?.birthDate) {
      this.exceptionService.alertDialog(ConstantMessages.BIRTHDATE_INVALID);
      return;
    }
    if (!this.user?.church) {
      this.exceptionService.alertDialog(ConstantMessages.CHURCH_INVALID);
      return;
    }

    return true;
  }
  close() {
    this.popCtrl.dismiss({ obj: this.user });
  }

  setBirthdate() {
    console.clear();
    this.user.birthDate = this.monthYear + '-' + this.day;
    console.log(this.user.birthDate);
  }

  onSelectMonth(value: any) {
    this.monthYear = value.substring(0, 7);
    this.setBirthdate();
  }

  userIsAlreadyRegistred() {
    const users = this.apiResponse.filter((cliente) =>
      UiService.stringNormalization(cliente.name).includes(
        UiService.stringNormalization(this.user.name)
      )
    );
    if (users?.length > 0) {
      for (let i = 0; i < users?.length; i++) {
        if (users[i]?.birthDate === this.user.birthDate) {
          this.user = users[i];
          this.exceptionService.alertDialog(
            ConstantMessages.USER_ALREADY_EXISTS,
            'Alerta'
          );
          return true;
        }
      }
      return false;
    }
  }
}
