import { Church } from './church';
/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './User';
export class Tithe {
  id: number;
  amount: number;
  isTithe: boolean;
  date: string;
  showDetails: boolean;
  created_at: string;
  user: User;
  register: User;
  church: Church;
  constructor(
    amount?: number,
    date?: string,
    user?: User,
    church?: Church,
    isTithe?: boolean
  ) {
    if (amount) {
      this.amount = amount;
    }
    if (date) {
      this.date = date;
    }
    if (user) {
      this.user = user;
    }
    if (church) {
      this.church = church;
    }
    if (isTithe) {
      this.isTithe = isTithe;
    } else {
      this.isTithe = true;
    }
  }
}
