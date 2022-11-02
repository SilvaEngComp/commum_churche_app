/* eslint-disable @typescript-eslint/naming-convention */
import { ChatConfig } from './chat';
export class PushNotify {
  title: string;
  body: string;
  click_action: PushOption;
  message: string;
  icon: string;
  audio: string;
  constructor(
    title: string,
    body: string,
    icon?: string,
    click_action?: string
  ) {
    this.audio = './assets/audio/notification.mp3';
    this.title = title;
    this.body = body;
    this.icon = icon;
    if (click_action) {
      this.click_action = JSON.parse(click_action);
    } else {
      this.click_action = new PushOption();
    }
  }
}

export class PushOption {
  delete: boolean;
  chatConfig: ChatConfig;
  page: string;

  constructor() {
    this.delete = false;
    this.chatConfig = new ChatConfig();
  }
}
