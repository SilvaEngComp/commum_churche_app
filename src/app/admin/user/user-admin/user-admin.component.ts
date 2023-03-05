import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() subpage: string;
  defaultPageName = 'user-subpage';
  constructor() {}

  ngOnInit() {
    if (!this.subpage) {
      if (UiService.localGet(this.defaultPageName)) {
        this.subpage = UiService.localGet(this.defaultPageName);
      }
      if (!this.subpage) {
        this.subpage = '0';
      }
    }
    UiService.pageMenu.subscribe((menu) => {
      this.subpage = menu.subpage;
      this.save();
    });
  }

  save() {
    UiService.localSet(this.defaultPageName, this.subpage);
  }

  onReceiveSession(subpage: string) {
    if (subpage === '-1') {
      this.subpage = Constants.MENU_GENERAL_OPTION_USER;
    } else {
      this.subpage = subpage;
    }
    this.save();
  }
}
