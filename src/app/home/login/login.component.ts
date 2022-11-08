import { Constants } from './../../models/constants';
import { UiService } from './../../services/ui.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { LoginService } from 'src/app/services/login.service';
import { ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLarge: boolean;
  user: User;
  page: number;
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.page = UiService.localGet(Constants.PAGE_MENU_LOGIN);
    this.isLarge = this.platform.width() > 500;

    if (!this.page) {
      this.page = 0;
    }
  }

  onSelectPage(page: any) {
    this.page = page;
    UiService.localSet(Constants.PAGE_MENU_LOGIN, this.page);
  }
}
