import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-menu-caixa-summary',
  templateUrl: './menu-caixa-summary.component.html',
  styleUrls: ['./menu-caixa-summary.component.scss'],
})
export class MenuCaixaSummaryComponent implements OnInit {
  options: string[] = [Constants.OPTION_EDIT, Constants.OPTION_DELETE];
  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {}

  selectOption(option: string) {
    this.popCtrl.dismiss({
      option,
    });
  }
}
