import { Constants } from './constants';

export class Wallet {
  id: number;
  name: string;
  constructor(id?: number) {
    if (id) {
      this.id = id;
    } else {
      this.name = Constants.WALLET_FLUX_NAME;
      this.id = Constants.WALLET_FLUX_ID;
    }
  }
}
