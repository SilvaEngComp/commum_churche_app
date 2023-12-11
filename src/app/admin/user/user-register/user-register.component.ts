import { Platform } from '@ionic/angular';
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() isEmergencial: boolean;
  isSmallDevice: boolean;
  user: User;
  localPageTitle: string;
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.isSmallDevice = this.platform.width() <= 500;
    this.user = new User();
    this.localPageTitle = Constants.TITLE_MEMBER_REGISTER;
  }

  back() {
    this.sessionPage.emit(Constants.PAGE_ADMIN_LIST_USER);
  }
}
