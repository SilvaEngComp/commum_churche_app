import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-menu-tithe',
  templateUrl: './menu-tithe.component.html',
  styleUrls: ['./menu-tithe.component.scss'],
})
export class MenuTitheComponent implements OnInit {
  options: string[] = [
    Constants.TITHE_MENU_OPTION_TITHE,
    Constants.TITHE_MENU_OPTION_OFFER,
  ];
  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {}

  selectOption(option: string) {
    this.popCtrl.dismiss({
      option,
    });
  }
}
