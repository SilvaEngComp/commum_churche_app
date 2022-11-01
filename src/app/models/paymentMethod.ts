export class PaymentMethod {
  id: number;
  name: string;
  disabled: boolean;


  constructor(id: number = 1) {
    if (id > 0 && id <= 5) {
      this.id = id;
      this.disabled = false;
      switch (id) {
        case 1:
          this.name = 'A Vista';
          break;
        case 2:
          this.name = 'Cartão Débito';
          break;
        case 3:
          this.name = 'Cartão Crédito';
          break;
        case 4:
          this.name = 'Consignado';
          break;
        case 5:
          this.name = 'Crediário';
          break;
      }

    }
  }
}
