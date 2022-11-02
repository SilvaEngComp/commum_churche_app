import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu-home-select',
  templateUrl: './menu-home-select.component.html',
  styleUrls: ['./menu-home-select.component.scss'],
})
export class MenuHomeSelectComponent implements OnInit {
  isLarge: boolean;
  user: User;
  page: string;
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.page = '0';
    this.isLarge = this.platform.width() > 500;
    console.log('Page: ' + this.page);
    console.log('isLarge: ' + this.isLarge);
  }
}
