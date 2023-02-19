import { Constants } from 'src/app/models/constants';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-financy-admin',
  templateUrl: './financy-admin.component.html',
  styleUrls: ['./financy-admin.component.scss'],
})
export class FinancyAdminComponent implements OnInit {
  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() subpage: string;
  defaultPageName = 'financy-subpage';
  constructor() {}

  ngOnInit() {
    if (!this.subpage) {
      this.subpage = '0';

      if (UiService.localGet(this.defaultPageName)) {
        this.subpage = UiService.localGet(this.defaultPageName);
      }
    }
    UiService.pageMenu.subscribe((menu) => {
      this.subpage = menu.subpage;
      this.save();
    });

    UiService.caixaAdminEmitter.subscribe((subpage) => {
      this.subpage = subpage;
      console.log(subpage);

      this.save();
    });
  }

  save() {
    UiService.localSet(this.defaultPageName, this.subpage);
  }

  onReceiveSession(subpage: string) {
    if (subpage === '-1') {
      this.sessionPage.emit(Constants.MENU_GENERAL_OPTION_MORE);
    }
    this.subpage = subpage;
    this.save();
  }
}
