/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { ChurchSchedule } from 'src/app/models/churchschedule';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { ScheduleTime } from 'src/app/models/ScheduleTime';
import { Church } from 'src/app/models/church';

@Component({
  selector: 'app-edit-text-church-schedule',
  templateUrl: './edit-text-church-schedule.component.html',
  styleUrls: ['./edit-text-church-schedule.component.scss'],
})
export class EditTextChurchScheduleComponent implements OnInit {
  @Output() returnSubpage: EventEmitter<any> = new EventEmitter<any>();

  @Input() churchSchedule: ChurchSchedule;
  publisher: User;
  is_loading: boolean;
  image: FormData;
  minDate: string;
  maxDate: string;
  datePipe = new DatePipe('en');
  dateValue: string;
  hasTime: boolean;
  session: number;
  daysOfWeek = Constants.DAYS_OF_WEEK;
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    this.session = 1;
    this.image = new FormData();
    this.churchSchedule = UiService.localGet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
    );
    if (!this.churchSchedule) {
      this.churchSchedule = new ChurchSchedule();
    }

    console.log(this.churchSchedule);
  }
  setTime(time: any, position) {
    this.churchSchedule.scheduleTimes[position].time = time;
    this.save();
  }
  setChurch(church: Church) {
    if (church) {
      this.churchSchedule.church = church;
    } else {
      this.churchSchedule.church = null;
    }

    this.save();
  }
  addScheduleTime() {
    if (!this.churchSchedule.scheduleTimes) {
      this.churchSchedule.scheduleTimes = [];
    }
    this.churchSchedule.scheduleTimes.push(new ScheduleTime());
  }

  checkChurchSchedule() {
    this.churchSchedule = UiService.localGet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
    );
    if (!this.churchSchedule) {
      this.churchSchedule = new ChurchSchedule();
    }
  }

  setTimeAsNow(scheduleTime: ScheduleTime, position: number) {
    scheduleTime.time = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    this.churchSchedule.scheduleTimes[position] = scheduleTime;
    this.save();
  }

  setTimeExists(position: number) {
    this.churchSchedule.scheduleTimes[position].hasTime = !this.hasTime;
  }

  setStatus(status: boolean) {
    this.churchSchedule.status = status;
  }

  setScheduleTime(schueduleTime: ScheduleTime) {
    this.churchSchedule.scheduleTimes.push(schueduleTime);
  }

  save() {
    UiService.localSet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT,
      this.churchSchedule
    );
  }

  onTypeTitle(title) {
    this.churchSchedule.title = title;
    this.save();
  }

  onTypeMessage(ev) {
    this.churchSchedule.message = ev.target.value;
    this.save();
  }
}
