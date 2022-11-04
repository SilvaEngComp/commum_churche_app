import { UiService } from './../../../services/ui.service';
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { ExceptionService } from 'src/app/services/exception-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Constants } from 'src/app/models/constants';
import { ConstantMessages } from 'src/app/models/messages';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  user: User;

  session: number;
  constructor(
    private usuarioService: UserService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.session = UiService.localGet(Constants.CURRENT_REGISTER_SESSION);
    console.log(this.session);
    if (!this.session) {
      this.session = 1;
      this.save();
    }
    this.user = UiService.localGet(Constants.REGISTRING_USER);
    console.log(this.user);
    if (!this.user) {
      this.user = new User();
      this.save();
    }
  }

  save() {
    UiService.localSet(Constants.CURRENT_REGISTER_SESSION, this.session);
  }

  onReceiveSession(session: number) {
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
      .then((responser) => {
        this.exceptionService.openLoading(
          ConstantMessages.FINISHING_REGISTRATION_TITLE,
          ConstantMessages.FINISHING_REGISTRATION_SUCCESS,
          true,
          30000
        );

        localStorage.clear();
      })
      .catch((erro) => {
        this.exceptionService.error(erro);
      });
  }
}
