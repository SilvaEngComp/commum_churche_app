import { Contact } from 'src/app/models/contact';
export class Church {
  id: number;
  name: string;
  contact: Contact;

  constructor() {
    this.contact = new Contact();
  }
}
