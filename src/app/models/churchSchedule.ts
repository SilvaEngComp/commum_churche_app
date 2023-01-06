import { Church } from './church';
import { DatePipe } from '@angular/common';
import { ScheduleTime } from './ScheduleTime';

export class ChurchSchedule {
  id: number;
  title: string;
  message: string;
  image: string;
  scheduleTimes: ScheduleTime[];
  church: Church;
  status: boolean;

  constructor() {
    this.scheduleTimes = [];
    this.church = new Church();
  }
}
