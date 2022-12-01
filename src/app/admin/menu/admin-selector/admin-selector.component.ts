import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-selector',
  templateUrl: './admin-selector.component.html',
  styleUrls: ['./admin-selector.component.scss'],
})
export class AdminSelectorComponent implements OnInit {
  isLarge: boolean;
  user: User;
  page: string;
  defaultPageName = 'menu-admin-page';
  constructor(private platform: Platform, private router: Router) {}

  ngOnInit() {
    this.page = '0';
    this.isLarge = this.platform.width() > 500;
    this.user = LoginService.getUser();

    if (UiService.localGet(this.defaultPageName)) {
      this.page = UiService.localGet(this.defaultPageName);
    }
  }

  onSelectPage(page: any) {
    console.clear();
    console.log(page);
    if (page < 0) {
      localStorage.clear();
      this.router.navigate(['']);
    }
    this.page = page;
    this.save();
  }
  save() {
    UiService.localSet(this.defaultPageName, this.page);
  }
}
