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
  constructor() {
    this.isTithe = true;
  }
}
