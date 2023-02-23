import { Constants } from './../../../models/constants';
import { UiService } from './../../../services/ui.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
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
