/* eslint-disable @typescript-eslint/member-ordering */
import { PopoverController } from '@ionic/angular';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-post',
  templateUrl: './menu-post.component.html',
  styleUrls: ['./menu-post.component.scss'],
})
export class MenuPostComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private popCtrl: PopoverController,
  ) { }

  ngOnInit() { }


  back(object: any) {
    this.popCtrl.dismiss(object);
  }

}
