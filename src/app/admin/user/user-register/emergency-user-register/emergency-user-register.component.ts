import { UserService } from '../../../../services/user.service';
import { ExceptionService } from '../../../../services/exception-service.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { ConstantMessages } from 'src/app/models/messages';
import { DayToSelectComponent } from 'src/app/home/home-user-register/register-personal-info/day-to-select/day-to-select.component';

@Component({
  selector: 'app-emergency-user-register',
  templateUrl: './emergency-user-register.component.html',
  styleUrls: ['./emergency-user-register.component.scss'],
})
export class EmergencyUserRegisterComponent implements OnInit {
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
    if (this.validForm()) {
      this.exceptionService.loadingFunction();

      this.userService
        .emergencialStore(this.user)
        .then(() => {
          this.close();
        })
        .catch((erro) => {
          this.exceptionService.error(erro);
        });
    }
  }

  validForm() {
    if (!this.user?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }
  close() {
    this.popCtrl.dismiss();
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
}
