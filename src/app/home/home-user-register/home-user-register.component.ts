import { LoginService } from './../../services/login.service';
import { Platform } from '@ionic/angular';
import { ConstantMessages } from 'src/app/models/messages';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-user-register',
  templateUrl: './home-user-register.component.html',
  styleUrls: ['./home-user-register.component.scss'],
})
export class HomeUserRegisterComponent implements OnInit {
  user: User;
  wouldShowBrads: boolean;
  session: number;
  constructor(
    private usuarioService: UserService,
    private exceptionService: ExceptionService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.session = UiService.localGet(Constants.CURRENT_REGISTER_SESSION);
    if (!this.session) {
      if (LoginService.getHeaders) {
        this.session = 1;
      } else {
        this.session = 0;
      }
      this.save();
    }
    this.user = UiService.localGet(Constants.REGISTRING_USER);
    if (!this.user) {
      this.user = new User();
      this.save();
    }

    this.wouldShowBrads = this.platform.width() > 500 && this.session > 0;
  }

  save() {
    UiService.localSet(Constants.CURRENT_REGISTER_SESSION, this.session);
  }

  onReceiveSession(session: number) {
    console.log(session);
    if (session === 4) {
      this.user = UiService.localGet(Constants.REGISTRING_USER);
      this.register();
    } else {
      this.session = session;
      this.save();
    }
  }

  register() {
    this.exceptionService.loadingFunction();

    this.usuarioService
      .store(this.user)
      .then(() => {
        this.clear();
        this.exceptionService.openLoading(
          ConstantMessages.FINISHING_REGISTRATION_TITLE,
          ConstantMessages.FINISHING_REGISTRATION_SUCCESS,
          true,
          30000
        );
      })
      .catch((erro) => {
        this.exceptionService.error(erro);
      });
  }

  clear() {
    UiService.localRemove(Constants.CURRENT_REGISTER_SESSION);
    UiService.localRemove(Constants.REGISTRING_USER);
    this.session = 0;
    this.save();
  }
}
