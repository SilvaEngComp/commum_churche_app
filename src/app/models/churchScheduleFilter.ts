import { ChurchScheduleType } from './churchScheduleType';
import { Church } from './church';

export class ChurchScheduleFilter {
  church: Church;
  churchScheduleType: ChurchScheduleType;

  constructor() {
    this.church = new Church();
    this.churchScheduleType = new ChurchScheduleType();
  }
  static getRequest(filter: ChurchScheduleFilter): string {
    let request = '';
    if (filter.church?.id) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'church_id=' + filter.church?.id;
    }
    if (filter.churchScheduleType?.id) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'church_schedule_type_id=' + filter.churchScheduleType?.id;
    }

    return request;
  }
}
