/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { ChurchSchedule } from 'src/app/models/churchschedule';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

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
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    this.session = 1;
    this.image = new FormData();
    this.churchSchedule = UiService.localGet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
    );
    if (!this.churchSchedule?.hasTime) {
      this.churchSchedule.hasTime = false;
    }
    console.log(this.churchSchedule);
  }

  checkChurchSchedule() {
    this.churchSchedule = UiService.localGet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
    );
    if (!this.churchSchedule) {
      this.churchSchedule = new ChurchSchedule();
    }

    if (!this.churchSchedule.date) {
      this.churchSchedule.date = this.datePipe.transform(
        Date.now(),
        'dd/MM/yyyy'
      );
    } else {
    }

    if (this.session === 1) {
      this.churchSchedule.published = false;
    } else if (this.session === 3) {
      this.churchSchedule.published = true;
    }
  }

  setTimeExists() {
    this.hasTime = !this.hasTime;
    this.churchSchedule.hasTime = this.hasTime;
  }

  setDate(date) {
    const validDateObj = UiService.validDate(date);
    if (validDateObj) {
      if (validDateObj.status) {
        this.churchSchedule.date = validDateObj.date;
        this.save();
      } else {
        this.exceptionService.alertDialog(validDateObj.message);
      }
    }
  }
  setTime(time) {
    const validDateObj = UiService.validTime(time);
    if (validDateObj) {
      if (validDateObj.status) {
        this.churchSchedule.date = validDateObj.date;
        this.save();
      } else {
        this.exceptionService.alertDialog(validDateObj.message);
      }
    }
  }

  save() {
    UiService.localSet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT,
      this.churchSchedule
    );
  }

  setDateAsNow() {
    this.churchSchedule.date = this.datePipe.transform(
      Date.now(),
      'dd/MM/yyyy'
    );
    this.save();
  }
  setTimeAsNow() {
    this.churchSchedule.time = this.datePipe.transform(Date.now(), 'HH::mm');
    this.save();
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
