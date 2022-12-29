import { Constants } from './../../../../models/constants';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-summary',
  templateUrl: './menu-summary.component.html',
  styleUrls: ['./menu-summary.component.scss'],
})
export class MenuSummaryComponent implements OnInit {
  options: string[] = [Constants.NEW_RETISTRATION, Constants.SHOW_GRAPH];
  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {}

  selectOption(option: string) {
    this.popCtrl.dismiss({
      option,
    });
  }
}
