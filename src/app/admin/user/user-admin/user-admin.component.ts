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
    UiService.setCurrentPage(Constants.TITLE_SECRETARY);
    this.subpage = UiService.localGet(Constants.PAGE_CONTROLL_SECRETARY_ADMIN);

    if (!UiService.checkValidPage(this.subpage)) {
      this.subpage = '1';
    }
    UiService.pageMenu.subscribe((menu) => {
      this.subpage = menu.subpage;
      this.save();
    });
  }

  save() {
    UiService.localSet(Constants.PAGE_CONTROLL_SECRETARY_ADMIN, this.subpage);
  }

  onReceiveSession(subpage: string) {
    if (subpage === '-1') {
      this.sessionPage.emit(Constants.MENU_GENERAL_OPTION_MORE);
    } else {
      this.subpage = subpage;
    }
    this.save();
  }
}
