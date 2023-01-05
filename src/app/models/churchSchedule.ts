import { DatePipe } from '@angular/common';

export class ChurchSchedule {
  id: number;
  title: string;
  message: string;
  image: string;
  published: boolean;
  date: string;
  time: string;
  checkPublish: boolean;
  hasTime: boolean;

  constructor() {
    this.published = true;
    this.hasTime = false;
    const datePipe = new DatePipe('en');
    this.date = datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.time = datePipe.transform(Date.now(), 'HH:mm');
  }
}
