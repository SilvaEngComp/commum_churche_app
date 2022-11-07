/* eslint-disable @typescript-eslint/naming-convention */
export class Contact {
  id: number;
  phone1: string;
  phone2: string;
  country_code: string;
  country: string;
  street_type: string;
  street: string;
  hauseNumber: string;
  hauseNumberCheck: boolean;
  complement: string;
  district: string;
  city: string;
  state: string;
  postalcode: string;

  constructor() {
    this.hauseNumberCheck = false;
  }
}
