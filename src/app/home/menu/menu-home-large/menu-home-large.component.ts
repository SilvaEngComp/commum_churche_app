/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform, NavController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Menu } from 'src/app/models/menu';
import { User } from 'src/app/models/User';
import { UiService } from 'src/app/services/ui.service';

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
    this.menu_itens = Menu.getMenu(true);
    this.page = this.menu_itens[0].id;
    this.nivel = 3;
    this.permission = false;
    if (UiService.localGet(Constants.MENU_HOME_PAGE)) {
      this.page = UiService.localGet(Constants.MENU_HOME_PAGE);
    }

    if (!this.page || this.page === '-1' || this.page === '-2') {
      this.page = '2';
    }

    // UiService.toTop.subscribe(() => {
    //   this.content.scrollToTop(2000);
    // });
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
    this.showMenu = !this.showMenu;
  }

  selectPage(page: any, item: Menu) {
    this.page = page;
    if (this.page === '0' || this.page === '1') {
      UiService.localSet(Constants.CURRENT_REGISTER_SESSION, Number(this.page));
    }
    UiService.localSet(Constants.MENU_HOME_PAGE, this.page);
  }

  socialNetworks(option: string) {
    UiService.socialNetworks(option);
  }
}
