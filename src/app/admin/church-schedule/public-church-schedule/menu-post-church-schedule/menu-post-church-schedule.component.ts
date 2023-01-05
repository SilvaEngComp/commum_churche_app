/* eslint-disable @typescript-eslint/member-ordering */
import { PopoverController } from '@ionic/angular';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-post-church-schedule',
  templateUrl: './menu-post-church-schedule.component.html',
  styleUrls: ['./menu-post-church-schedule.component.scss'],
})
export class MenuPostChurchScheduleComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {}

  back(object: any) {
    this.popCtrl.dismiss(object);
  }
}
