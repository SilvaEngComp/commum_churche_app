import { UserService } from '../../../../services/user.service';
import { ExceptionService } from '../../../../services/exception-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { ConstantMessages } from 'src/app/models/messages';
import { DayToSelectComponent } from 'src/app/home/home-user-register/register-personal-info/day-to-select/day-to-select.component';
import { UiService } from 'src/app/services/ui.service';

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
  constructor(
    private exceptionService: ExceptionService,
    private userService: UserService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.user = new User();
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
