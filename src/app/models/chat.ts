/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './User';

export class Chat{
  id: number;
  message: string;
  file_path: string;
  sender: User;
  receiver: User;
  date: number;
  change: boolean;

  constructor( sender?: User, receiver?: User, date?: number) {
    this.message ='';
    this.date = date;
    this.sender = sender;
    this.receiver = receiver;
  }
}


export class ChatUser{
  user: User;
  notRead: number;
  lastMessage: Chat;
  chatConfig: ChatConfig;

  constructor() {

  }
}


export class ChatConfig{
  id: number;

  sender: User;
  receiver: User;
  audio: boolean;
  favorite: boolean;

  constructor() {
     }
}
