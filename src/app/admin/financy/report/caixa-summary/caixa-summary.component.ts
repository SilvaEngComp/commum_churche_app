import { CaixaFacadeService } from 'src/app/facades/caixa-facade.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Caixa } from 'src/app/models/caixa';
import { CaixaSummary } from 'src/app/models/caixaSummary';
import { FinancySummary } from 'src/app/models/fianancySummary';

@Component({
  selector: 'app-caixa-summary',
  templateUrl: './caixa-summary.component.html',
  styleUrls: ['./caixa-summary.component.scss'],
})
export class CaixaSummaryComponent implements OnInit {
  @Output() mantainceEmiter: EventEmitter<any> = new EventEmitter<any>();
  @Input() caixaSummary: CaixaSummary;
  @Input() isEntry: boolean;
  headCaixaList: string[] = ['Registrado por', 'Tipo', 'Motivo'];
  constructor(private caixaFacade: CaixaFacadeService) {}

  ngOnInit() {
    this.caixaFacade.dataLoaded.subscribe((data) => {
      console.log('emiting request to reload');
      this.mantainceEmiter.emit();
    });
  }

  setShowSummaryDetail(caixa: CaixaSummary) {
    this.caixaSummary.showDetails = !this.caixaSummary.showDetails;
  }

  setShowCaixaDetail(caixa: Caixa, caixaSummary: CaixaSummary) {
    const caixaPosition = this.caixaSummary.caixas.indexOf(caixa);
    this.caixaSummary.caixas[caixaPosition].showDetails =
      !this.caixaSummary.caixas[caixaPosition].showDetails;
  }

  async edit(caixa: Caixa) {
    this.caixaFacade.registerCaixa(false, caixa);
  }
  delete(caixa: Caixa) {
    this.caixaFacade.delete(caixa);
  }
}
