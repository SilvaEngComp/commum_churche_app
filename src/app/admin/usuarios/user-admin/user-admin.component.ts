import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  subpage: string;
  defaultPageName = 'user-subpage';
  constructor() {}

  ngOnInit() {
    this.subpage = '0';

    if (UiService.localGet(this.defaultPageName)) {
      this.subpage = UiService.localGet(this.defaultPageName);
    }

    UiService.pageMenu.subscribe((menu) => {
      this.subpage = menu.subpage;
      this.save();
    });
  }

  save() {
    UiService.localSet(this.defaultPageName, this.subpage);
  }
}
