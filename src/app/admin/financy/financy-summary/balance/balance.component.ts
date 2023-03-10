import { ConstantMessages } from './../../../../models/messages';
import { SummaryInput } from './../../../../models/sumaryInput';
import { Wallet } from './../../../../models/wallet';
import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { IonPopover } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FinancyService } from 'src/app/services/financy-service.service';
import { UiService } from 'src/app/services/ui.service';
import { TitheFacade } from 'src/app/facades/tithe-facade.service';
import { CaixaFacadeService } from 'src/app/facades/caixa-facade.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, AfterViewInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  summaryinput: SummaryInput;
  filter: FinancySummaryFilter;
  noContent = 'Nenhum Registro';
  initialDate: string;
  endDate: string;
  localPageTitle: string;
  wallet: Wallet;
  isLoading: boolean;
  constructor(
    private financyService: FinancyService,
    private titheFacade: TitheFacade,
    private exeptionService: ExceptionService,
    private caixaFacade: CaixaFacadeService
  ) {}
  ngAfterViewInit(): void {
    UiService.mySelectEmitter.emit({ obj: this.wallet, listName: 'wallets' });
  }
  ngOnInit() {
    this.localPageTitle = Constants.TITLE_SUMMARY_BALANCE;
    this.checkFilter();
    this.load();

    this.titheFacade.dataLoaded.subscribe((data) => {
      this.load();
    });

    this.caixaFacade.dataLoaded.subscribe((data) => {
      this.load();
    });
  }

  checkFilter() {
    this.filter = UiService.localGet(Constants.FINANCY_SUMMARY_FILTER);
    if (!this.filter) {
      this.filter = new FinancySummaryFilter();

      const datePipe = new DatePipe('en');
      const date = new Date();
      const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
      const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.initialDate = datePipe.transform(primeiroDia, 'YYYY-MM-dd');
      this.endDate = datePipe.transform(ultimoDia, 'YYYY-MM-dd');
      this.wallet = UiService.localGet(Constants.CAIXA_WALLET);
      UiService.mySelectEmitter.emit({ obj: this.wallet, listName: 'wallets' });

      this.filter.dateI = this.initialDate;
      this.filter.dateF = this.endDate;

      if (this?.wallet) {
        this.filter.wallet_id = this?.wallet?.id;
      } else {
        this.filter.wallet_id = Constants.WALLET_FLUX_ID;
      }
    }
  }

  receiveMantainceEmiter(ev: any) {
    this.load();
  }

  selectDateInterval(popover: IonPopover) {
    popover?.dismiss();
    this.saveFilter();
    this.load();
  }

  setIntialDate(date: any) {
    this.initialDate = date.substring(0, 10);
    this.filter.dateI = this.initialDate;
  }
  setEndDate(date: any) {
    this.endDate = date.substring(0, 10);
    this.filter.dateF = this.endDate;
  }
  async load() {
    if (this.isValidFilter()) {
      this.financyService
        .getInputs(this.filter)
        .then((response) => {
          this.summaryinput = response.data;
          console.log(this.summaryinput);
        })
        .catch((error) => this.exeptionService.error(error));
    }
  }

  isValidFilter() {
    if (!this.filter?.dateI || !this.filter?.dateF) {
      this.exeptionService.alertDialog(
        ConstantMessages.INVALIDE_DATE_INTERVAL,
        'Alerta'
      );
      return false;
    }
    if (!this.filter?.wallet_id) {
      this.exeptionService.alertDialog(
        ConstantMessages.INVALID_WALLET,
        'Alerta'
      );
      return false;
    }
    return true;
  }

  back() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_SUMMARY);
  }

  setWallet(wallet: Wallet) {
    if (wallet) {
      this.wallet = wallet;
      this.filter.wallet_id = this.wallet.id;
      this.load();
      UiService.localSet(Constants.CAIXA_WALLET, this.wallet);
    } else {
      this.wallet = null;
      UiService.localRemove(Constants.CAIXA_WALLET);
    }
    this.saveFilter();
  }

  saveFilter() {
    UiService.localSet(Constants.FINANCY_SUMMARY_FILTER, this.filter);
  }
}
