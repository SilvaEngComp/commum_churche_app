import { UiService } from 'src/app/services/ui.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';

export class CaixaFilter {
  id: number;
  date: string;
  type: number;
  seller_id: number;
  size: number;
  page: number;

  constructor(type = null, date: string = null) {
    this.type = type;
    if (!date) {
      this.date = UiService.getCurrentDate();
    }
  }

  getRequest() {
    let request = '';

    if (this.size) {
      request += 'page=' + this.page * this.size + '&size=' + this.size;
    }

    if (this.date.length > 0) {
      request += `&date=${this.date}`;
    }
    if (this.type) {
      request += `&type=${this.type}`;
    }
    if (this.seller_id) {
      request += `&seller_id=${this.seller_id}`;
    }

    return request;
  }
}
