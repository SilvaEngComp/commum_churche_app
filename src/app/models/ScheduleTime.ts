export class ScheduleTime {
  id: number;
  day: string;
  numberOfDay: number;
  time: string;
  hasTime: boolean;
  constructor() {
    this.hasTime = true;
  }
}
