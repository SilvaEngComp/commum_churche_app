import { Tithe } from './tithe';
import { User } from './User';

export class TitheSummary {
  total: number;
  tithes: Tithe[];
  showDetails: boolean;
  user: User;
  isTithe: boolean;

  constructor() {
    this.total = 0;
  }
}
