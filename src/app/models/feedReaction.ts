import { User } from './User';

/* eslint-disable @typescript-eslint/naming-convention */
export class FeedComment {
  id: number;
  message: string;
  commenter: User;
  edit: boolean;

  constructor() {
    this.commenter = new User();
  }
}
