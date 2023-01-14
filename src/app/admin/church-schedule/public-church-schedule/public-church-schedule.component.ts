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
  @ViewChild('divType', { static: false }) divType: ElementRef;
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  expandAll: boolean;
  user: User;
  churchSchedules: ChurchSchedule[];
  base_url: string = environment.IMAGE_URL;
  is_loading: boolean;
  showComment: boolean;
  filterChurchSchedule: ChurchScheduleFilter;
  churchScheduleTypes: ChurchScheduleType[];
  selectedSchedule: ChurchScheduleType;
  filter: ChurchScheduleFilter;
  churchSchedule: ChurchSchedule;
  showTypes: boolean;
  constructor(
    private churchScheduleService: ChurchScheduleService,
    private churchScheduleTypeService: ChurchScheduleTypeService,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.expandAll = false;
    this.user = LoginService.getUser();
    this.filter = new ChurchScheduleFilter();
    this.selectedSchedule = new ChurchScheduleType();
    this.load();
  }
  showCompleteMessage() {
    this.expandAll = !this.expandAll;
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
  }

  save() {
    // UiService.localSet(Constants.CHURCH_SCHEDULE_SELECTED_FILTER, this.churchSchedule)
  }

  setChurchScheduleType(ev: any) {
    this.filter.churchScheduleType.id = ev.target.value;
    this.churchScheduleService.get(this.filter).then((responser) => {
      this.churchSchedules = responser.data;
      console.log(this.churchSchedules);
    });
  }

  checkImage(user: User) {
    if (!user?.image) {
      if (user?.gender.toLocaleLowerCase().includes('masculino')) {
        user.image = Constants.MALE_PERSON;
      } else {
        user.image = Constants.FEMALE_PERSON;
      }
    }
    return user;
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
      this.load();
    }
    if (obj.ChurchSchedules) {
      this.churchSchedules = obj.ChurchSchedules;
    }
  }
}
