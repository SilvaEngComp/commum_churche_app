import { ChurchScheduleService } from '../../../services/churchSchedule.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { ChurchSchedule } from 'src/app/models/ChurchSchedule';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-church-schedule',
  templateUrl: './church-schedule.component.html',
  styleUrls: ['./church-schedule.component.scss'],
})
export class ChurchScheduleComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() subpage: string;
  churchSchedule: ChurchSchedule;
  callbackPage: string;
  constructor(private churchScheduleService: ChurchScheduleService) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_CHURCH_SCHEDULE_REGISTER
    );

    UiService.pageTitle.emit(Constants.TITLE_CHURCH_SCHEDULE_REGISTER);

    if (!this.subpage) {
      UiService.localSet(
        Constants.CHURCH_SCHEDULE_SUBPAGE,
        Constants.CHURCH_SCHEDULE_PAGE_PUBLIC
      );
      this.subpage = UiService.localGet(Constants.CHURCH_SCHEDULE_SUBPAGE);
      if (!this.subpage) {
        this.subpage = Constants.CHURCH_SCHEDULE_PAGE_PUBLIC;
      }
    }
    UiService.schedulePage.subscribe((obj) => {
      if (obj.subpage) {
        this.saveChurchSchedulePage(obj.subpage);
      }
    });

    console.log(this.subpage);
  }

  returnPage(obj) {
    console.log(obj);
    if (obj.churchSchedule) {
      this.churchSchedule = obj.churchSchedule;
      this.saveChurchSchedule();
    }

    if (obj.callbackPage) {
      this.callbackPage = obj.callbackPage;
      UiService.localSet('callbackPage', this.callbackPage);
    }
    if (obj.subpage) {
      this.saveChurchSchedulePage(obj.subpage);
    }
  }
  doRefresh() {
    // window.location.reload();
  }

  saveChurchSchedulePage(page) {
    this.subpage = page;
    UiService.localSet(Constants.CHURCH_SCHEDULE_SUBPAGE, this.subpage);
  }

  saveChurchSchedule() {
    UiService.localSet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT,
      this.churchSchedule
    );
  }
}
