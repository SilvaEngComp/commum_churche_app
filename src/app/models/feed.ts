import { DatePipe } from '@angular/common';
import { FeedComment } from './feedReaction';
import { User } from './User';

export class Feed {
  id: number;
  publisher: User;
  title: string;
  message: string;
  image: string;
  onlineClass: boolean;
  published: boolean;
  date: string;
  time: string;
  checkPublish: boolean;
  love: boolean;
  comments: FeedComment[];

  constructor() {
    this.published = true;
    this.onlineClass = false;
    const datePipe = new DatePipe('en');
    this.date = datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.time = datePipe.transform(Date.now(), 'HH:mm:ss');
    this.comments = [];
  }
}
