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
  subPageTitle: string;

  constructor() {}

  ngOnInit() {
    UiService.setCurrentPage(Constants.TITLE_SUMMARY_FINANCY);
    this.subpage = UiService.localGet(Constants.PAGE_CONTROLL_FINANCY_ADMIN);

    if (!UiService.checkValidPage(this.subpage)) {
      this.subpage = '1';
    }
    UiService.pageMenu.subscribe((menu) => {
      this.subpage = menu.subpage;
      this.save();
    });

    UiService.caixaAdminEmitter.subscribe((subpage) => {
      debugger;
      this.subpage = subpage;

      this.save();
    });

    UiService.subPageTitle.subscribe((title: string) => {
      this.subPageTitle = title;
    });
  }
  back() {
    const subpage = UiService.localGet(Constants.BACK_PAGE);
    if (subpage) {
      if (subpage === '-1') {
        this.sessionPage.emit(Constants.MENU_GENERAL_OPTION_MORE);
      }
      this.subpage = subpage;
    }
  }
  save() {
    UiService.localSet(Constants.PAGE_CONTROLL_FINANCY_ADMIN, this.subpage);
  }

  onReceiveSession(subpage: string) {
    if (subpage === '-1') {
      this.sessionPage.emit(Constants.MENU_GENERAL_OPTION_MORE);
    }
    console.log(subpage);

    this.subpage = subpage;
    this.save();
  }
}
