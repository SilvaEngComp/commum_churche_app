import { Church } from './church';
import { ChurchScheduleType } from './churchScheduleType';
import { ScheduleTime } from './ScheduleTime';

export class ChurchSchedule {
  id: number;
  title: string;
  message: string;
  scheduleTimes: ScheduleTime[];
  church: Church;
  status: boolean;
  churchScheduleType: ChurchScheduleType;
  dates: string[];

  constructor() {
    this.scheduleTimes = [];
    this.dates = [];
    this.church = new Church();
    this.churchScheduleType = new ChurchScheduleType();
  }
}
