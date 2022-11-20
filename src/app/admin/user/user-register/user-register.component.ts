import { UiService } from './../../../services/ui.service';
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { ExceptionService } from 'src/app/services/exception-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  back() {
    this.sessionPage.emit(Constants.PAGE_ADMIN_LIST_USER);
  }
}
