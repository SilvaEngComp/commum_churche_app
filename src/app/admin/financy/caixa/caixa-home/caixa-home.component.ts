import { DatePipe } from '@angular/common';
import { FinancyService } from './../../../../services/financy-service.service';
import { Caixa } from './../../../../models/caixa';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CaixaSummary } from 'src/app/models/caixaSummary';

@Component({
  selector: 'app-caixa-home',
  templateUrl: './caixa-home.component.html',
  styleUrls: ['./caixa-home.component.scss'],
})
export class CaixaHomeComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  sumary: CaixaSummary;
  month: string;
  year: string;

  constructor(private financyService: FinancyService) {}

  ngOnInit() {
    const datePipe = new DatePipe('en');
    this.month = datePipe.transform(Date.now(), 'MM');
    this.year = datePipe.transform(Date.now(), 'YYYY');
    this.load();
  }

  async load() {
    if (this.month && this.year) {
      const response = await this.financyService.caixaSummary(
        this.month,
        this.year
      );
      console.log(response);
      if (response?.data) {
        this.sumary = response.data;
        console.log(this.sumary);
      }
    }
  }
}
