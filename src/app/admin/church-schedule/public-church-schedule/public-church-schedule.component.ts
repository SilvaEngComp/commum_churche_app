import { DatePipe } from '@angular/common';
/* eslint-disable max-len */
import { ChurchScheduleFilter } from './../../../models/churchScheduleFilter';
import { UiService } from './../../../services/ui.service';
import { ChurchScheduleService } from 'src/app/services/churchSchedule.service';
import { Constants } from 'src/app/models/constants';
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { ChurchSchedule } from 'src/app/models/ChurchSchedule';
import { User } from 'src/app/models/User';
import { Church } from 'src/app/models/church';
import { ChurchScheduleTypeService } from 'src/app/services/church-schedule-type.service';
import { ChurchScheduleType } from 'src/app/models/churchScheduleType';

@Component({
  selector: 'app-public-church-schedule',
  templateUrl: './public-church-schedule.component.html',
  styleUrls: ['./public-church-schedule.component.scss'],
})
export class PublicChurchScheduleComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  churchSchedules: ChurchSchedule[];
  churchSchedulesFound: ChurchSchedule[];
  is_loading: boolean;
  filterChurchSchedule: ChurchScheduleFilter;
  churchScheduleTypes: ChurchScheduleType[];
  selectedSchedule: ChurchScheduleType;
  filter: ChurchScheduleFilter;
  churchSchedule: ChurchSchedule;
  showTypes: boolean;
  daysOfSchedule: string[] = [];
  datePipe: DatePipe;
  constructor(
    private churchScheduleService: ChurchScheduleService,
    private churchScheduleTypeService: ChurchScheduleTypeService,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.filter = UiService.localGet(Constants.CHURCH_SCHEDULE_SELECTED_FILTER);
    if (!this.filter) {
      this.filter = new ChurchScheduleFilter();
    }
    this.selectedSchedule = new ChurchScheduleType();
    this.load();
    this.datePipe = new DatePipe('en');
    this.daysOfSchedule.push(this.datePipe.transform(Date.now(), 'YYYY-MM-dd'));
  }

  load() {
    this.churchScheduleTypeService.get(this.filter).then((responser) => {
      this.churchScheduleTypes = responser.data;
      this.showTypes = true;
    });
  }
  delete(schedule: ChurchSchedule) {
    this.exeptionService.loadingFunction();
    this.churchScheduleService
      .destroy(schedule)
      .then(() => this.load())
      .catch((err) => this.exeptionService.error(err));
  }

  setChurch(church: Church): void {
    if (church) {
      this.filter.church = church;
    } else {
      this.filter.church = null;
    }

    if (this.filter.church) {
      UiService.mySelectEmitter.emit({
        listName: 'churchScheduleTypes',
        obj: this.filter,
      });
    }

    this.save();
    this.getSchedules();
  }

  save() {
    UiService.localSet(Constants.CHURCH_SCHEDULE_SELECTED_FILTER, this.filter);
  }

  setChurchScheduleType(ev: any) {
    this.filter.churchScheduleType.id = ev.target.value;
    this.save();
    this.getSchedules();
  }

  getSchedules() {
    if (this?.filter?.church?.id && this?.filter?.churchScheduleType?.id) {
      this.churchScheduleService.get(this.filter).then((responser) => {
        this.churchSchedulesFound = responser.data;
        const daysOfSchedule: string[] = [];
        daysOfSchedule.push(this.datePipe.transform(Date.now(), 'YYYY-MM-dd'));
        this.churchSchedulesFound.filter((schedule) => {
          // console.log(schedule);
          if (schedule?.dates?.length > 0) {
            schedule?.dates?.filter((date) => {
              daysOfSchedule.push(date);
            });
          }
        });
        if (daysOfSchedule?.length > 0) {
          this.daysOfSchedule = daysOfSchedule;
        }
      });
    }
  }

  selectDateEvent(ev: any) {
    console.clear();
    let selectedDay;
    const values: string[] = ev.target.value;
    this.daysOfSchedule.filter((selctedDate) => {
      if (!values.includes(selctedDate)) {
        selectedDay = selctedDate;
      }
    });

    if (selectedDay) {
      this.churchSchedules = this.churchSchedulesFound.filter(
        (churchSchedule) => {
          if (churchSchedule?.dates.includes(selectedDay)) {
            return churchSchedule;
          }
        }
      );
    }
  }
  newChurchSchedule() {
    UiService.localRemove(Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT);
    this.returnPage.emit({
      subpage: Constants.CHURCH_SCHEDULE_PAGE_CREATE_SCHEDULE,
      ChurchSchedule: new ChurchSchedule(),
    });
  }

  returnSubPage(obj: any) {
    console.log(obj);
    if (obj.subpage) {
      this.returnPage.emit(obj);
    }
    if (obj.refresh) {
      this.getSchedules();
    }
    if (obj.clear) {
      this.filter = new ChurchScheduleFilter();
      this.load();
    }
    if (obj.ChurchSchedules) {
      this.churchSchedules = obj.ChurchSchedules;
    }
  }
}
