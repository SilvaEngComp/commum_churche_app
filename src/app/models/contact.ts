export class Contact {
  id: number;
  value: string;
  contactType: ContactType;

  constructor(value: string, contactType: string) {
    this.value = value;

    switch (contactType) {
      case 'phone':
        this.contactType = new ContactType(1, 'phone');
        break;
      case 'email':
        this.contactType = new ContactType(1, 'email');
    }
  }
}

export class ContactType {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
