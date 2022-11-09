import { Router } from '@angular/router';
import { ExceptionService } from 'src/app/services/exception-service.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();

  user: User;
  typePassword1: string;
  typepasswordConfirmation: string;
  show1: boolean;
  show2: boolean;
  editing: boolean;
  password: string;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  btnDisable: boolean;
  diferentes: boolean;
  isRolesValid: boolean;
  is_registering: boolean;
  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = UiService.localGet(Constants.RECOVER_USER);
    if (!this.user) {
      localStorage.clear();
      this.cancel();
    }
    this.diferentes = false;
    this.btnDisable = true;
    this.check1 = false;
    this.check2 = false;
    this.check3 = false;
    this.check4 = false;
    this.check5 = false;
    this.editing = false;
    this.show1 = false;
    this.show2 = false;
    this.password = '';
    this.typePassword1 = 'password';
    this.typepasswordConfirmation = 'password';
  }

  save() {
    UiService.localSet(Constants.REGISTRING_USER, this.user);
  }

  setEditing() {
    this.editing = !this.editing;
  }

  checkRoles(newPassword) {
    this.password = newPassword;
    let teste = RegExp('[A-Z]');
    let flat = 0;

    if (teste.test(this.password)) {
      this.check1 = true;
      flat++;
    } else {
      this.check1 = false;
      flat--;
    }

    teste = RegExp('[a-z]');
    if (teste.test(this.password)) {
      this.check2 = true;
      flat++;
    } else {
      this.check2 = false;
      flat--;
    }
    teste = RegExp('[0-9]');
    if (teste.test(this.password)) {
      this.check3 = true;
      flat++;
    } else {
      this.check3 = false;
      flat--;
    }
    teste = RegExp('[./@/-/_]');
    if (teste.test(this.password)) {
      this.check4 = true;
      flat++;
    } else {
      this.check4 = false;
      flat--;
    }
    if (this.password.length >= 8) {
      this.check5 = true;
      flat++;
    } else {
      this.check5 = false;
      flat--;
    }

    if (flat >= 5) {
      this.isRolesValid = false;
    } else {
      this.isRolesValid = true;
    }
  }

  validPassword(passwordConfirmation: any) {
    if (this.password.length > 0 && passwordConfirmation.length > 0) {
      if (passwordConfirmation !== this.password) {
        this.diferentes = true;
      } else {
        this.diferentes = false;
      }
    }

    if (this.diferentes) {
      this.btnDisable = true;
    } else if (!this.diferentes && this.isAllParametersValids()) {
      this.btnDisable = false;
    }
  }

  isAllParametersValids() {
    return (
      this.check1 && this.check2 && this.check3 && this.check4 && this.check5
    );
  }

  showPassword(op) {
    if (op === 1) {
      this.show1 = !this.show1;
      if (this.show1) {
        this.typePassword1 = 'text';
      } else {
        this.typePassword1 = 'password';
      }
    } else {
      this.show2 = !this.show2;
      if (this.show2) {
        this.typepasswordConfirmation = 'text';
      } else {
        this.typepasswordConfirmation = 'password';
      }
    }
  }
  cancel() {
    this.selectedPage.emit(Constants.PAGE_LOGIN);
  }

  sendUpdate() {
    if (!this.user) {
      this.user = new User();
    }
    console.log(this.btnDisable);
    if (!this.btnDisable) {
      this.user.password = this.password;
      this.exceptionService.loadingFunction();
      this.loginService
        .updatePassword(this.user)
        .then((token) => {
          LoginService.setToken(token);
          this.router.navigate(['admin']);
        })
        .catch((error) => this.exceptionService.error(error));
    }
  }
}
