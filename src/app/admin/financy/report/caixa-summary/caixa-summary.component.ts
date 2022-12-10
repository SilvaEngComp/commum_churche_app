import { Component, Input, OnInit } from '@angular/core';
import { Caixa } from 'src/app/models/caixa';
import { CaixaSummary } from 'src/app/models/caixaSummary';
import { FinancySummary } from 'src/app/models/fianancySummary';

@Component({
  selector: 'app-caixa-summary',
  templateUrl: './caixa-summary.component.html',
  styleUrls: ['./caixa-summary.component.scss'],
})
export class CaixaSummaryComponent implements OnInit {
  @Input() caixaSummary: CaixaSummary;
  @Input() isEntry: boolean;
  headCaixaList: string[] = ['Registrado por', 'Tipo', 'Motivo'];
  constructor() {}

  ngOnInit() {}

  setShowSummaryDetail(caixa: CaixaSummary) {
    this.caixaSummary.showDetails = !this.caixaSummary.showDetails;
  }

  setShowCaixaDetail(caixa: Caixa, caixaSummary: CaixaSummary) {
    const caixaPosition = this.caixaSummary.caixas.indexOf(caixa);
    this.caixaSummary.caixas[caixaPosition].showDetails =
      !this.caixaSummary.caixas[caixaPosition].showDetails;
  }
}
