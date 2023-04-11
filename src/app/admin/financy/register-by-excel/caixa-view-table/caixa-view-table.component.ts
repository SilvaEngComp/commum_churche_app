import { Component, Input, OnInit } from '@angular/core';
import { Caixa } from 'src/app/models/caixa';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-caixa-view-table',
  templateUrl: './caixa-view-table.component.html',
  styleUrls: ['./caixa-view-table.component.scss'],
})
export class CaixaViewTableComponent implements OnInit {
  @Input() caixas: Caixa[];

  headCaixaList: string[] = Constants.CAIXA_REPORT_HEADER;
  constructor() {}

  ngOnInit() {}

  delete(caixa: Caixa) {}
}
