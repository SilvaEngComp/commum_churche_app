import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-financy-admin',
  templateUrl: './financy-admin.component.html',
  styleUrls: ['./financy-admin.component.scss'],
})
export class FinancyAdminComponent implements OnInit {
  subpage: string;
  defaultPageName = 'financy-subpage';
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

  onReceiveSession(subpage: string) {
    console.log(subpage);
    this.subpage = subpage;
    this.save();
  }
}
