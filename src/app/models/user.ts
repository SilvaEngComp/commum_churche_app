import { Church } from './church';
import { InputMethod } from './inputhMethod';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Constants } from './constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { Contact } from './contact';
import { MaritalStatus } from './maritalStatus';
import { DatePipe } from '@angular/common';

export class User {
  id: number;
  name: string;
  email: string;
  isBaptized: string;
  isBaptizedString: string;
  birthDate: string;
  contact: Contact;
  roles: string[];
  password: string;
  policy: boolean;
  image: string;
  occupation: string;
  gender: string;
  maritalStatus: MaritalStatus;
  inputMethod: InputMethod;
  church: Church;
  showDetails: boolean;
  registerMethod: string;
  created_at: string;
  fcm_web_key: string;
  fcm_mobile_key: string;
  fcm_mobile_web_key: string;
  isEditing: boolean;

  constructor(started?: boolean) {
    if (!started) {
      this.password = '';
      this.roles = [Constants.ROLE_MEMBER];
      this.contact = new Contact();
      this.maritalStatus = new MaritalStatus();
      this.inputMethod = new InputMethod();
      this.church = new Church();
      this.showDetails = false;
    }
  }
}
