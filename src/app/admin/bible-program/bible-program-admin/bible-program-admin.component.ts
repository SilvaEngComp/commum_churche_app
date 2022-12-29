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
  defaultPageName = 'bible-program-subpage';
  constructor() {}

  ngOnInit() {
    if (!this.subpage) {
      this.subpage = '1';

      if (UiService.localGet(this.defaultPageName)) {
        this.subpage = UiService.localGet(this.defaultPageName);
      }
    }

    console.log(this.subpage);
  }

  save() {
    UiService.localSet(this.defaultPageName, this.subpage);
  }

  onReceiveSession(subpage: any) {
    this.subpage = subpage;
    this.save();
  }
}
