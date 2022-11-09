import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-to-select',
  templateUrl: './day-to-select.component.html',
  styleUrls: ['./day-to-select.component.scss'],
})
export class DayToSelectComponent implements OnInit {
  days: string[] = [];
  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        this.days.push('0' + i);
      } else {
        this.days.push(String(i));
      }
    }
  }

  onSelectDay(day: string) {
    this.popCtrl.dismiss({ day });
  }
}
