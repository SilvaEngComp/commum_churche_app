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

  constructor() {
    this.scheduleTimes = [];
    this.church = new Church();
    this.churchScheduleType = new ChurchScheduleType();
  }
}
