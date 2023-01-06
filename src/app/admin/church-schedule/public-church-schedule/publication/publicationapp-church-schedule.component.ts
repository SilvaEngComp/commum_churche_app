import { ChurchScheduleService } from '../../../../services/churchSchedule.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { MenuPostChurchScheduleComponent } from '../menu-post-church-schedule/menu-post-church-schedule.component';
import { ChurchSchedule } from 'src/app/models/churchSchedule';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-publication-church-schedule',
  templateUrl: './publicationapp-church-schedule.component.html',
  styleUrls: ['./publicationapp-church-schedule.component.scss'],
})
export class PublicationChurchScheduleComponent implements OnInit {
  @Output() returnSubpage: EventEmitter<any> = new EventEmitter<any>();
  @Input() expandAll: boolean;
  @Input() churchSchedule: ChurchSchedule;
  user: User;
  base_url: string = environment.IMAGE_URL;
  is_loading: boolean;
  is_menu_oppened: boolean;
  is_a_selected_post: boolean;
  permission: boolean;
  constructor(
    private scheduleService: ChurchScheduleService,
    private popCtrl: PopoverController,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    if (!this.churchSchedule) {
      this.churchSchedule = UiService.localGet(
        Constants.CHURCH_SCHEDULE_ATTRIBUTES_OBJECT
      );
    }

    if (
      UiService.localGet(Constants.CHURCH_SCHEDULE_SUBPAGE) ===
      'selected-schedule'
    ) {
      this.is_a_selected_post = true;
    }
  }

  back() {
    UiService.schedulePage.emit({
      subpage: Constants.CHURCH_SCHEDULE_PAGE_PUBLIC,
    });
  }

  showCompleteMessage() {
    this.expandAll = !this.expandAll;
  }

  delete(schedule: ChurchSchedule) {
    this.exeptionService.loadingFunction();
    this.scheduleService
      .destroy(schedule)
      .then((responser) => {
        this.returnSubpage.emit({ refresh: true });
      })
      .catch((err) => this.exeptionService.error(err));
  }

  async menuPost(churchSchedule: ChurchSchedule, ev) {
    if (!this.is_menu_oppened) {
      this.is_menu_oppened = true;

      const pop = await this.popCtrl.create({
        component: MenuPostChurchScheduleComponent,
        event: ev,
      });

      await pop.present();
      const { data } = await pop.onDidDismiss();

      if (data) {
        console.log(data);
        if (data === 'edit') {
          console.log(data);

          this.returnSubpage.emit({
            subpage: Constants.CHURCH_SCHEDULE_PAGE_CREATE_SCHEDULE,
            churchSchedule,
          });
        } else {
          this.delete(churchSchedule);
        }
      }
      this.is_menu_oppened = false;
    }
  }
}
