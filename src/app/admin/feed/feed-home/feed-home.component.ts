import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-feed-home',
  templateUrl: './feed-home.component.html',
  styleUrls: ['./feed-home.component.scss'],
})
export class FeedHomeComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  localImage: string;

  constructor() {}

  ngOnInit() {}

  async selectOption(subpage: string) {
    this.returnPage.emit({ subpage });
  }

  back() {
    this.returnPage.emit(Constants.MENU_BACK);
  }
}
