import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  localImage: string;
  height: string;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.height = this.platform.height() * 0.9 + 'px';
  }

  async selectOption(page: string) {
    this.returnPage.emit(page);
  }
}
