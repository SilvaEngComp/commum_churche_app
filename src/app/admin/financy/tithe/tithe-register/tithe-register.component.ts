import { DatePipe } from '@angular/common';
import { Tithe } from 'src/app/models/tithe';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, Platform, ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController,
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
    this.onSelectMonth(this.monthYear);
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

  async register(amount: any) {
    this.tithe.amount = UiService.convertToNumber(amount);
    const tipo = this.tithe?.isTithe ? 'do dízimo' : 'da oferta';

    if (this.tithe.id) {
      await this.titheService.update(this.tithe);
      this.exceptionService.openLoading(
        `Entrada ${tipo} alterado com Successo!`
      );
    } else {
      await this.titheService.store(this.tithe);
      this.exceptionService.openLoading(
        `Entrada ${tipo} registrado com Successo!`
      );
    }

    this.modalCtrl.dismiss({
      action: true,
    });
  }

  back() {
    this.modalCtrl.dismiss({
      action: false,
    });
  }
}
