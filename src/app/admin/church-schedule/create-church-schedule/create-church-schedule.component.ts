import { ConstantMessages } from 'src/app/models/messages';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { User } from 'src/app/models/User';
import { PushNotify } from 'src/app/models/pushNotification';
import { Constants } from 'src/app/models/constants';
import { ChurchSchedule } from 'src/app/models/churchSchedule';
import { ChurchScheduleService } from 'src/app/services/churchSchedule.service';

@Component({
  selector: 'app-create-church-schedule',
  templateUrl: './create-church-schedule.component.html',
  styleUrls: ['./create-church-schedule.component.scss'],
})
export class CreateChurchScheduleComponent implements OnInit {
  @Output() returnSubpage: EventEmitter<any> = new EventEmitter<any>();

  @Input() churchSchedule: ChurchSchedule;
  publisher: User;
  is_loading: boolean;
  base_url: string = environment.IMAGE_URL;
  image: FormData;
  minDate: string;
  maxDate: string;
  datePipe = new DatePipe('en');
  dateValue: string;
  hasTime: boolean;
  session: number;
  constructor(
    private churchscheduleService: ChurchScheduleService,
    private messagingService: MessagingService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.session = 1;
    this.image = new FormData();
    this.checkChurchSchedule();
  }

  setSession(ev: any) {
    this.session = Number(ev.target.value);
    this.checkChurchSchedule();
  }

  checkChurchSchedule() {
    this.churchSchedule = UiService.localGet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
    );
    console.log(this.churchSchedule);
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

  backSession() {
    this.session--;
    this.checkChurchSchedule();
  }
  back() {
    console.log({ subpage: Constants.CHURCH_SCHEDULE_PAGE_PUBLIC });
    this.returnSubpage.emit({ subpage: Constants.CHURCH_SCHEDULE_PAGE_PUBLIC });

    UiService.localRemove(Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT);
  }
  save() {
    UiService.localSet(
      Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT,
      this.churchSchedule
    );
  }

  receiveSubpage(obj: any) {
    if (obj.files) {
      this.checkChurchSchedule();
      this.churchscheduleService
        .upload(obj.files.formData, this.churchSchedule)
        .then((responser) => {
          this.churchSchedule.image = responser.data.image;
          this.save();
          // window.location.reload();
        });
    }
  }

  publish() {
    this.checkChurchSchedule();

    if (this.session !== 2) {
      if (this.validForm()) {
        this.churchscheduleService
          .store(this.churchSchedule)
          .then((responser) => {
            this.churchSchedule = responser.data;
            if (this.session === 3) {
              this.back();
              const push: PushNotify = new PushNotify(
                this.churchSchedule.title,
                this.churchSchedule.message
              );
              this.messagingService.send(push);
            } else {
              this.session++;
            }
          });
      }
    } else {
      this.session++;
    }

    console.log(this.session);
  }

  validForm() {
    if (!this.churchSchedule?.title) {
      this.exceptionService.alertDialog(ConstantMessages.TITILE_INVALID);
      return;
    }

    return true;
  }
}
