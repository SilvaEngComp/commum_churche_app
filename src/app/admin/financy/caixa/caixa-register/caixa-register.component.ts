import { ConstantMessages } from 'src/app/models/messages';
import { CaixaType } from './../../../../models/caixaType';
import { CaixaTypeService } from './../../../../services/caixa-type.service';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { DayToSelectComponent } from 'src/app/home/home-user-register/register-personal-info/day-to-select/day-to-select.component';
import { Caixa } from 'src/app/models/caixa';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { CaixaService } from 'src/app/services/caixa.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';

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
  caixaTypes: CaixaType[];
  customizedMonth: CustomizedMonth;
  year: string;
  isEntry: string;
  value: string;
  constructor(
    private caixaService: CaixaService,
    private caixaTypeService: CaixaTypeService,
    private exceptionService: ExceptionService,
    private platform: Platform,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    if (!this.caixa) {
      this.caixa = new Caixa();
      this.value = '';
      this.isEntry = '0';
    } else {
      this.value = UiService.convertToCurrency(this.caixa?.amount);
      this.isEntry = String(this.caixa?.isEntry);
    }
    this.isSmallDevice = this.platform.width() <= 500;
    const datePipe = new DatePipe('en');
    this.monthYear = datePipe.transform(Date.now(), 'YYYY-MM');
    this.day = datePipe.transform(Date.now(), 'dd');
    this.onSelectMonth(this.monthYear);
    this.load();
  }

  async load() {
    const inputMethodResponser = await this.caixaTypeService.get();
    this.caixaTypes = inputMethodResponser.data;
  }

  setIsEntry(ev: any) {
    console.log(ev.target.value);
    this.caixa.isEntry = ev.target.value;
    console.log(this.caixa.isEntry);
  }

  onSelectMonth(value: any) {
    this.monthYear = value.substring(0, 7);
    const dates = this.monthYear.split('-');
    this.year = dates[0];
    this.customizedMonth = new CustomizedMonth(Number(dates[1]));
    this.concatDate();
  }

  concatDate() {
    console.clear();
    this.caixa.date = this.monthYear + '-' + this.day;
  }

  async register(amount: any) {
    this.caixa.amount = UiService.convertToNumber(amount);
    if (this.isFormValid()) {
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
  }

  async openDay(ev: any) {
    const pop = await this.popCtrl.create({
      component: DayToSelectComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onDidDismiss();
    if (data) {
      this.day = data.day;
      this.concatDate();
    }
  }

  back() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_SUMMARY);
  }

  setType(ev: any) {
    if (!this.caixa.caixaType) {
      this.caixa.caixaType = new CaixaType();
    }
    this.caixa.caixaType.id = ev.target.value;
  }

  isFormValid() {
    if (!this.caixa?.amount || this.caixa?.amount <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.AMOUNT_INVALID);
      return;
    }

    const dates = this.caixa.date.split('-');
    if (
      !dates[0] ||
      dates[0]?.length !== 4 ||
      !dates[1] ||
      dates[1]?.length !== 2
    ) {
      this.exceptionService.alertDialog(ConstantMessages.MONTH_YEAR_INVALID);
      return;
    }
    if (!dates[2] || dates[2]?.length > 2) {
      this.exceptionService.alertDialog(ConstantMessages.DAY_INVALID);
      return;
    }

    if (!this.caixa?.caixaType?.id) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_TYPE_INVALID);
      return;
    }
    if (!this.caixa?.isEntry) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_TYPE_INVALID);
      return;
    }

    return true;
  }
}
