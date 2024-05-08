import { Constants } from './../../../models/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-bible-program-admin',
  templateUrl: './bible-program-admin.component.html',
  styleUrls: ['./bible-program-admin.component.scss'],
})
export class BibleProgramAdminComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() subpage: string;
  constructor() {}

  ngOnInit() {
    if (UiService.localGet(Constants.BIBLE_PROGRAM_SUBPAGE)) {
      this.subpage = UiService.localGet(Constants.BIBLE_PROGRAM_SUBPAGE);
    }
    if (!this.subpage) {
      this.subpage = Constants.BIBLE_PROGRAM_MENU_READ_DAY;
    }

    this.subpage = String(this.subpage);
    console.log(this.subpage);
  }

  save() {
    UiService.localSet(Constants.BIBLE_PROGRAM_SUBPAGE, this.subpage);
  }

  onReceiveSession(subpage: any) {
    this.subpage = subpage;
    this.save();
  }
}
