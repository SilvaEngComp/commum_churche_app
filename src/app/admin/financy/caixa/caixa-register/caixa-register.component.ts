import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { DayToSelectComponent } from 'src/app/home/home-user-register/register-personal-info/day-to-select/day-to-select.component';
import { Caixa } from 'src/app/models/caixa';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { CaixaService } from 'src/app/services/caixa.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa-register',
  templateUrl: './caixa-register.component.html',
  styleUrls: ['./caixa-register.component.scss'],
})
export class CaixaRegisterComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() caixa: Caixa;
  @Input() isNew: boolean;

  monthYear: string;
  months: CustomizedMonth[];
  isSmallDevice: boolean;
  days: string[] = [];
  day: string;
  constructor(
    private caixaService: CaixaService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService,
    private platform: Platform,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    if (!this.caixa) {
      this.caixa = new Caixa();
    }
    this.isSmallDevice = this.platform.width() <= 500;
    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    this.onSelectMonth(this.monthYear);
  }

  setIsEntry(ev: any) {
    console.log(ev.target.value);
    this.caixa.isEntry = Number(ev.target.value) === 1 ? true : false;
    console.log(this.caixa.isEntry);
  }

  onSelectMonth(value: any) {
    this.monthYear = value.substring(0, 7);
    this.concatDate();
  }

  concatDate() {
    console.clear();
    this.caixa.date = this.monthYear + '-' + this.day;
  }

  async register(amount: any) {
    this.caixa.amount = UiService.convertToNumber(amount);
    const tipo = this.caixa?.isEntry ? 'Entrada' : 'Saída';

    if (this.caixa.id) {
      await this.caixaService.update(this.caixa);
      this.exceptionService.openLoading(`${tipo} alterada com Successo!`);
    } else {
      await this.caixaService.story(this.caixa);
      this.exceptionService.openLoading(`${tipo} registrada com Successo!`);
    }

    this.back();
  }

  async openDay(ev: any) {
    const pop = await this.popCtrl.create({
      component: DayToSelectComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onDidDismiss();
    console.log(data.day);
    if (data) {
      this.day = data.day;
      this.concatDate();
    }
  }

  back() {
    this.sessionPage.emit('1');
  }
}
