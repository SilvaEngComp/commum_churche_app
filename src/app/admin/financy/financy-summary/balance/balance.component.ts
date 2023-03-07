import { Wallet } from './../../../../models/wallet';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonPopover } from '@ionic/angular';
import { CaixaSummary } from 'src/app/models/caixaSummary';
import { Constants } from 'src/app/models/constants';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { FinancySummary } from 'src/app/models/totalInputOutput';
import { FinancySummaryFilter } from 'src/app/models/financySummaryFilter';
import { TitheSummary } from 'src/app/models/tithesummary';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FinancyService } from 'src/app/services/financy-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  @Input() inputSummary: CaixaSummary;
  @Input() titheSummary: TitheSummary;
  @Input() offerSummary: TitheSummary;
  @Input() sumary: FinancySummary[];
  filter: FinancySummaryFilter;
  noContent = 'Nenhum Registro';
  initialDate: string;
  endDate: string;
  localPageTitle: string;
  wallet: Wallet;
  constructor(
    private financyService: FinancyService,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_SUMMARY_BALANCE
    );
    this.localPageTitle = Constants.TITLE_SUMMARY_BALANCE;
    this.filter = new FinancySummaryFilter();
    const datePipe = new DatePipe('en');
    const date = new Date();
    const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.initialDate = datePipe.transform(primeiroDia, 'YYYY-MM-dd');
    this.endDate = datePipe.transform(ultimoDia, 'YYYY-MM-dd');
    this.wallet = UiService.localGet(Constants.CAIXA_WALLET);

    this.filter.dateI = this.initialDate;
    this.filter.dateF = this.endDate;
    if (this?.wallet) {
      this.filter.wallet_id = this?.wallet?.id;
    } else {
      this.filter.wallet_id = Constants.WALLET_FLUX_ID;
    }
    this.load();
  }

  receiveMantainceEmiter(ev: any) {
    this.load();
  }

  selectDateInterval(popover: IonPopover) {
    popover?.dismiss();
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
    if (!this.filter?.dateI || !this.filter?.dateF) {
      this.exeptionService.alertDialog(
        'Selecione a data de inicio e fim da consulta',
        'Alerta'
      );
    }
    this.financyService.caixaSummary(this.filter).then((response) => {
      this.sumary = response.data;
      this.inputSummary = new CaixaSummary();
      this.offerSummary = new TitheSummary();
      this.titheSummary = new TitheSummary();

      this.sumary.filter((summary) => {
        summary?.summary?.result?.caixaSummary?.input?.filter(
          (caixaSummary) => {
            if (caixaSummary?.isEntry) {
              this.inputSummary.total += caixaSummary?.total;
            }
          }
        );
      });
    });
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
  }
}
