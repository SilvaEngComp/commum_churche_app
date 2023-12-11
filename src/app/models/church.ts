import { Contact } from 'src/app/models/contact';
export class Church {
  id: number;
  name: string;
  contact: Contact;
  show: boolean;

  constructor() {
    this.contact = new Contact();
  }
}
