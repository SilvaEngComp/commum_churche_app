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
  title: string;
  // isMember: boolean;
  @ViewChild('main', { static: false }) content: IonContent;

  constructor(private platform: Platform, private nav: NavController) {}

  ngOnInit() {
    this.title = UiService.localGet(Constants.TITLE_CURRENT_PAGE);
    UiService.pageTitle.subscribe((title) => (this.title = title));
    this.height = this.platform.height();
    this.showMenu = true;

    this.nivel = 3;
    this.permission = false;
    this.user = LoginService.getUser();
    this.menu_itens = Menu.getMenu();
    this.page = this.menu_itens[0]?.id;

    if (UiService.localGet(this.defaultPageName)) {
      this.page = UiService.localGet(this.defaultPageName);
    }

    this.checkImage();
  }

  getConditions() {
    this.largura = window.innerWidth;

    if (this.platform.is('android') || this.largura < 750) {
      return false;
    }
    return true;
  }

  checkImage() {
    if (!this.user?.image) {
      if (this.user?.gender?.toLocaleLowerCase().includes('masculino')) {
        this.user.image = Constants.MALE_PERSON;
      } else {
        this.user.image = Constants.FEMALE_PERSON;
      }
    }
  }

  setShowMenu() {
    this.showMenu = !this.showMenu;
  }

  selectSubPage(page: any, subpage: any) {
    this.page = page;
    UiService.pageMenu.emit({ subpage });
  }

  perfil() {
    this.page = Constants.MENU_PERFIL;
    UiService.localSet(this.defaultPageName, Constants.MENU_PERFIL);
  }

  selectPage(menu: Menu) {
    if (menu) {
      menu.showSub = !menu.showSub;
    }
    console.log(menu);

    if (UiService.localGet(Constants.USER_MAINTAINCE)) {
      UiService.localRemove(Constants.USER_MAINTAINCE);
    }

    if (menu?.name !== Constants.LATERAL_MENU_OUT) {
      this.page = menu.id;
      UiService.localSet(this.defaultPageName, this.page);
    } else {
      localStorage.clear();
      this.nav.navigateForward('');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
}
