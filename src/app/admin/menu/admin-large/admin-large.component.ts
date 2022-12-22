/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform, NavController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Menu } from 'src/app/models/menu';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-large',
  templateUrl: './admin-large.component.html',
  styleUrls: ['./admin-large.component.scss'],
})
export class AdminLargeComponent implements OnInit {
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
  defaultPageName = 'lastPage';
  isMember: boolean;
  @ViewChild('main', { static: false }) content: IonContent;

  constructor(private platform: Platform, private nav: NavController) {}

  ngOnInit() {
    this.height = this.platform.height();
    this.showMenu = true;

    this.nivel = 3;
    this.permission = false;
    this.page = '0';
    if (UiService.localGet(this.defaultPageName)) {
      this.page = UiService.localGet(this.defaultPageName);
    }

    this.user = LoginService.getUser();
    if (this?.user?.role !== 'member') {
      this.menu_itens = Menu.getMenuAdmin();
      this.isMember = false;
    } else {
      this.menu_itens = Menu.getMenuMember();
      this.isMember = true;
    }
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

  selectSubPage(page: any, subpage: any) {
    this.page = page;
    UiService.pageMenu.emit({ subpage });
  }

  selectPage(page: any, item: Menu) {
    item.showSub = !item.showSub;
    if (UiService.localGet(Constants.USER_MAINTAINCE)) {
      UiService.localRemove(Constants.USER_MAINTAINCE);
    }
    if (this.page === page) {
      window.location.reload();
    }
    if (page !== this.menu_itens.length - 1) {
      this.page = page;
      UiService.localSet(this.defaultPageName, this.page);
    } else {
      localStorage.clear();
      this.nav.navigateForward('');
    }
  }
}
