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
  rowNumber: number;
  problems: string[];
  constructor(
    amount?: number,
    date?: string,
    user?: User,
    church?: Church,
    isTithe?: boolean,
    rowNumber?: number,
    problems?: string[]
  ) {
    this.amount = amount;
    this.date = date;
    this.user = user;
    this.church = church;
    this.isTithe = isTithe;
    this.rowNumber = rowNumber;
    this.problems = problems;
  }
}
