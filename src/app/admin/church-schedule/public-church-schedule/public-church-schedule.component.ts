import { ChurchScheduleService } from 'src/app/services/churchSchedule.service';
import { Constants } from 'src/app/models/constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { ChurchSchedule } from 'src/app/models/ChurchSchedule';
import { User } from 'src/app/models/User';
import { FilterChurchSchedule } from 'src/app/models/filterChurchSchedule';

@Component({
  selector: 'app-public-church-schedule',
  templateUrl: './public-church-schedule.component.html',
  styleUrls: ['./public-church-schedule.component.scss'],
})
export class PublicChurchScheduleComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  user: User;
  churchSchedules: ChurchSchedule[];
  base_url: string = environment.IMAGE_URL;
  is_loading: boolean;
  showComment: boolean;
  filterChurchSchedule: FilterChurchSchedule;

  constructor(
    private churchScheduleService: ChurchScheduleService,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    console.log('public ChurchSchedule');
    this.user = LoginService.getUser();
    this.filterChurchSchedule = new FilterChurchSchedule();
    this.load();
  }

  load() {
    this.is_loading = true;
    this.exeptionService.loadingFunction();
    this.churchScheduleService
      .get(this.filterChurchSchedule)
      .then((responser) => {
        this.churchSchedules = responser.data;
        console.log(this.churchSchedules);
        const datePipe = new DatePipe('en');
        const now = datePipe.transform(Date.now(), 'yyyy-MM-dd');
        const time = datePipe.transform(Date.now(), 'HH:mm:ss');
        if (this.churchSchedules) {
          this.churchSchedules.filter((churchSchedule) => {
            if (churchSchedule.date) {
              if (churchSchedule.date < now) {
                churchSchedule.checkPublish = true;
              } else {
                if (churchSchedule.time <= time) {
                  churchSchedule.checkPublish = true;
                }
              }
            }
          });
        }
        this.is_loading = false;
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
    if (obj.ChurchSchedules) {
      this.churchSchedules = obj.ChurchSchedules;
    }
  }
}
