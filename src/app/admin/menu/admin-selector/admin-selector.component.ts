import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admin-selector',
  templateUrl: './admin-selector.component.html',
  styleUrls: ['./admin-selector.component.scss'],
})
export class AdminSelectorComponent implements OnInit {
  isLarge: boolean;
  user: User;
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.isLarge = this.platform.width() > 500;
    this.user = LoginService.getUser();
  }
}
