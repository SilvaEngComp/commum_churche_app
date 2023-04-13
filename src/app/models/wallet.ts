export class Wallet {
  id: number;
  name: string;
  constructor(id?: number) {
    if (id) {
      this.id = id;
    } else {
      this.id = 1;
    }
  }
}
