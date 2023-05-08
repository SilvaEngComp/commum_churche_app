import { DatePipe } from '@angular/common';
import { FeedComment } from './feedReaction';
import { User } from './User';

export class Feed {
  id: number;
  publisher: User;
  title: string;
  message: string;
  image: string;
  isPublished: boolean;
  date: string;
  time: string;
  checkPublish: boolean;
  love: boolean;
  comments: FeedComment[];
  hasTime: boolean;
  showComment: boolean;
  url: string;
  linkType: number;

  constructor() {
    this.isPublished = false;
    this.showComment = false;
    const datePipe = new DatePipe('en');
    this.date = datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.time = datePipe.transform(Date.now(), 'HH:mm');
    this.comments = [];
  }
}
