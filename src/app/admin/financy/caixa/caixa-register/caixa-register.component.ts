import { CaixaCategory } from '../../../../models/caixaCategory';
import { Church } from 'src/app/models/church';
import { ConstantMessages } from 'src/app/models/messages';
import { CaixaSubcategory } from '../../../../models/caixaSubcategory';
import { CaixaSubcategoryService } from '../../../../services/caixa-subcategory.service';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Caixa } from 'src/app/models/caixa';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { CaixaService } from 'src/app/services/caixa.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { ChurchService } from 'src/app/services/church.service';
import { User } from 'src/app/models/User';

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
  caixaSubcategorys: CaixaSubcategory[];
  customizedMonth: CustomizedMonth;
  year: string;
  isEntry: string;
  value: string;
  churches: Church[];
  caixaCategorys: CaixaCategory[];
  localPageTitle: string;
  datePipe: DatePipe;
  showDescription: boolean;
  buttonColor: string;
  height: string;
  constructor(
    private caixaService: CaixaService,
    private caixaSubcategoryService: CaixaSubcategoryService,
    private exceptionService: ExceptionService,
    private platform: Platform,
    private actionCtrl: AlertController,
    private churchService: ChurchService
  ) {}

  ngOnInit() {
    this.height = Math.round(this.platform.height() * 0.7) + 'px';
    this.caixa = UiService.localGet(Constants.CAIXA_MAINTAINCE);

    if (!this.caixa) {
      this.caixa = new Caixa();
      this.value = '0,0';
      this.caixa.isEntry = UiService.localGet(Constants.IS_ENTRY);
      this.isNew = true;
    } else {
      this.value = UiService.convertToCurrency(this.caixa?.amount);
      this.isNew = false;
    }

    if (this.caixa.isEntry) {
      this.localPageTitle = Constants.TITLE_CAIXA_REGISTER_IN;
      this.buttonColor = 'success';
    } else {
      this.buttonColor = 'danger';
      this.localPageTitle = Constants.TITLE_CAIXA_REGISTER_OUT;
    }
    UiService.localSet(Constants.TITLE_CURRENT_PAGE, this.localPageTitle);
    this.isSmallDevice = this.platform.width() <= 500;
    this.datePipe = new DatePipe('en');
    this.caixa.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.load();
  }

  async load() {
    const inputMethodResponser = await this.caixaSubcategoryService.get();
    this.caixaSubcategorys = inputMethodResponser.data;

    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;
  }

  setShowDescription() {
    this.showDescription = !this.showDescription;
  }
  setIsEntry(ev: any) {
    console.clear();
    this.caixa.isEntry = ev.target.value;
  }

  onSetDate(value: any, option: number = 0) {
    if (value) {
      this.caixa.date = value.substring(0, 10);
    } else {
      if (option === 1) {
        this.caixa.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      } else {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        this.caixa.date = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
      }
    }
  }

  async askNeedDoAgain() {
    const action = await this.actionCtrl.create({
      header: 'O que deseja fazer?',
      subHeader: 'Deseja realizar outro registro ?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {},
        },
        {
          text: 'Não',
          handler: () => {
            this.back();
          },
        },
      ],
    });

    await action.present();

    const result = await action.onDidDismiss();
  }
  async register(amount: any) {
    this.caixa.amount = UiService.convertToNumber(amount);
    if (this.isFormValid()) {
      const tipo = this.caixa?.isEntry ? 'Entrada' : 'Saída';

      if (!this.isNew) {
        this.caixaService.update(this.caixa).then(() => {
          this.exceptionService.toastHandler(
            `${tipo} alterada com Successo!`,
            5000
          );
          this.askNeedDoAgain();
        });
      } else {
        this.caixaService.story(this.caixa).then(() => {
          this.exceptionService.toastHandler(
            `${tipo} registrada com Successo!`,
            5000
          );
          this.askNeedDoAgain();
        });
      }
    }
  }

  back() {
    this.sessionPage.emit(UiService.localGet(Constants.BACK_PAGE));
  }

  isFormValid() {
    if (!this.caixa?.caixaCategory?.id) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_GROUP_INVALID);
      return;
    }
    if (!this.caixa?.caixaSubcategory?.id) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_TYPE_INVALID);
      return;
    }

    if (!this.caixa?.church?.id) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_CHURCH_INVALID);
      return;
    }

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

    if (!this.caixa.isEntry && this.caixa?.description?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.CAIXA_DESCRIPTION_INVALID
      );
      return;
    }

    return true;
  }

  setType(caixaSubcategory: CaixaSubcategory) {
    if (caixaSubcategory) {
      this.caixa.caixaSubcategory = caixaSubcategory;
    } else {
      this.caixa.caixaSubcategory = null;
    }
  }

  setChurch(church: Church) {
    if (church) {
      this.caixa.church = church;
    } else {
      this.caixa.church = null;
    }
  }
  setGroup(caixaCategory: CaixaCategory) {
    if (caixaCategory) {
      this.caixa.caixaCategory = caixaCategory;
    } else {
      this.caixa.caixaCategory = null;
    }
  }

  setUser(user: User) {
    if (user) {
      this.caixa.register = user;
    } else {
      this.caixa.register = null;
    }
  }

  onWindowScroll(ev: any) {
    UiService.scrollVerseRead.emit({ status: true });
  }
}
