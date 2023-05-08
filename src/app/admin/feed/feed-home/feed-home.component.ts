import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';

@Component({
  selector: 'app-feed-home',
  templateUrl: './feed-home.component.html',
  styleUrls: ['./feed-home.component.scss'],
})
export class FeedHomeComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  localImage: string;

  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {}

  async selectOption(subpage: string) {
    if (subpage?.length > 0) {
      this.returnPage.emit({ subpage });
    } else {
      this.exceptionService.alertDialog('Funcionalidade em desenvolvimento');
    }
  }

  back() {
    this.returnPage.emit({ page: Constants.MENU_BACK });
  }
}
