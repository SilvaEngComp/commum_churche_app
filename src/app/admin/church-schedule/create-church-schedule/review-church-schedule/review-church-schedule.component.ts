import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { ChurchSchedule } from 'src/app/models/churchschedule';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-review-church-schedule',
  templateUrl: './review-church-schedule.component.html',
  styleUrls: ['./review-church-schedule.component.scss'],
})
export class ReviewChurchScheduleComponent implements OnInit {
  @Input() expandAll: boolean;

  churchSchedule: ChurchSchedule;

  constructor() {}

  ngOnInit() {
    this.checkChurchSchedule();
  }
  checkChurchSchedule() {
    this.churchSchedule = UiService.localGet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
    );
    if (!this.churchSchedule) {
      this.churchSchedule = new ChurchSchedule();
    }
  }
  showCompleteMessage() {
    this.expandAll = !this.expandAll;
  }
}
