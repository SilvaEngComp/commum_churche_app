/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './User';

export class TokenAccess {
  data: DataToken;
  message: string;
  status: string;

  constructor() {
    this.data = new DataToken();
  }

}


export class DataToken {
  token: string;
  user: User;
}

