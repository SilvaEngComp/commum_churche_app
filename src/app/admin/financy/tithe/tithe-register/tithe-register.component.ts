import { DatePipe } from '@angular/common';
import { Tithe } from 'src/app/models/tithe';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, Platform } from '@ionic/angular';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { TitheService } from 'src/app/services/tithe.service';

@Component({
  selector: 'app-tithe-register',
  templateUrl: './tithe-register.component.html',
  styleUrls: ['./tithe-register.component.scss'],
})
export class TitheRegisterComponent implements OnInit {
  @Input() tithe: Tithe;
  @Input() isNew: boolean;

  monthYear: string;
  months: CustomizedMonth[];
  isSmallDevice: boolean;
  constructor(
    private titheService: TitheService,
    private popCtrl: PopoverController,
    private exceptionService: ExceptionService,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (!this.tithe) {
      this.tithe = new Tithe();
    }
    this.isSmallDevice = this.platform.width() <= 500;
    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
  }

  onSelectMonth(value: any) {
    if (!value) {
      value = this.monthYear;
    }
    const dates = value.substring(0, 7).split('-');
    this.tithe.month = dates[1];
    this.tithe.year = dates[0];
    console.clear();
    console.log(this.tithe);
  }
  setIsTithe(ev: any) {
    this.tithe.isTithe = ev.target.value;
  }
  async alterar(amount: any) {
    this.tithe.amount = UiService.convertToNumber(amount);

    if (this.tithe.id) {
      await this.titheService.update(this.tithe);
      this.exceptionService.openLoading(
        'Entrado do tithe registrado com Successo!'
      );
    } else {
      await this.titheService.store(this.tithe);
      this.exceptionService.openLoading(
        'Entrado do tithe alterado com Successo!'
      );
    }

    this.popCtrl.dismiss({
      action: true,
    });
  }

  cancelar() {
    this.popCtrl.dismiss({
      action: false,
    });
  }
}
