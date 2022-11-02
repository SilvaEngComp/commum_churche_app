/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform, NavController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Menu } from 'src/app/models/menu';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-home-large',
  templateUrl: './menu-home-large.component.html',
  styleUrls: ['./menu-home-large.component.scss'],
})
export class MenuHomeLargeComponent implements OnInit {
  menu_itens: Menu[] = [];
  permission: boolean;
  nivel: number;
  largura: number;
  page: string;
  base_url: string = environment.IMAGE_URL;
  user: User;
  showMenu: boolean;
  menu_size_left: string;
  menu_size_right: string;
  height: number;
  @ViewChild('main', { static: false }) content: IonContent;

  constructor(private platform: Platform, private nav: NavController) {}

  ngOnInit() {
    this.height = this.platform.height();
    this.showMenu = true;
    this.menu_itens = Menu.getMenuHome();
    console.log(this.menu_itens);
    this.nivel = 3;
    this.permission = false;
    this.page = '0';
    if (UiService.localGet(Constants.MENU_HOME_PAGE)) {
      this.page = UiService.localGet(Constants.MENU_HOME_PAGE);
    }

    UiService.toTop.subscribe(() => {
      this.content.scrollToTop(2000);
    });
  }

  doRefresh(ev) {
    window.location.reload();
  }

  getConditions() {
    this.largura = window.innerWidth;

    if (this.platform.is('android') || this.largura < 750) {
      return false;
    }
    return true;
  }

  setShowMenu() {
    this.checkPlaftorm();
    this.showMenu = !this.showMenu;
  }

  checkPlaftorm() {
    if (this.platform.width() <= 500) {
      if (this.showMenu) {
        this.menu_size_left = '0';
        this.menu_size_right = '12';
        this.showMenu = false;
      } else {
        this.menu_size_left = '8';
        this.menu_size_right = '1';
      }
    } else {
      this.menu_size_left = '2';
      this.menu_size_right = '9';
    }
  }

  selectSubPage(page: any, subpage: any) {
    this.page = page;
    UiService.pageMenu.emit({ subpage });
    this.checkPlaftorm();
    this.content.scrollToTop(2000);
  }

  selectPage(page: any, item: Menu) {
    this.checkPlaftorm();
    this.page = page;
    console.log(this.page);
    UiService.localSet(Constants.MENU_HOME_PAGE, this.page);
  }
}
