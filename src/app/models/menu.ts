import { environment } from './../../environments/environment.prod';
import { UiService } from './../services/ui.service';
/* eslint-disable @typescript-eslint/prefer-for-of */

import { Constants } from './constants';

/* eslint-disable @typescript-eslint/naming-convention */
export class Menu {
  id: string;
  name: string;
  submenu: string[];
  showSub: boolean;

  constructor(id?: string, name?: string, submenu?: string[]) {
    this.id = id;
    this.name = name;
    this.submenu = submenu;
  }

  static getMenu(isHome: boolean = false) {
    const menuGeral: Menu[] = [];
    const menu_itens: string[] = this.getMenuByPermission(isHome);
    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      const submenu = [];
      // if (menu_itens[i] === Constants.LATERAL_MENU_FINANCY) {
      //   submenu = [Constants.LATERAL_SUBMENU_SUMMARY];
      // }
      const id = Menu.getMenuId(menu_itens[i], isHome);
      menuGeral.push(new Menu(id, menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }

  static getMenuByPermission(isHome: boolean) {
    const menu_itens: string[] = [];
    try {
      if (isHome) {
        menu_itens.push(Constants.SUPERIOR_MENU_HOME);
        menu_itens.push(Constants.SUPERIOR_MENU_REGISTER);
        menu_itens.push(Constants.SUPERIOR_MENU_LOGIN);
        if (environment.TEST) {
          menu_itens.push(Constants.SUPERIOR_MENU_BIRTHDAYS);
        }
      } else {
        menu_itens.push(Constants.LATERAL_MENU_PROFILE);

        if (UiService.validPermissions(Constants.ROLE_MEMBER)) {
          menu_itens.push(Constants.LATERAL_MENU_BIBLE_READ);
        }

        if (environment.TEST) {
          menu_itens.push(Constants.LATERAL_MENU_TITHE_OFFER);
          menu_itens.push(Constants.LATERAL_MENU_FEED);
          menu_itens.push(Constants.LATERAL_MENU_PROGRAM);
        }
        if (UiService.validPermissions(Constants.ROLE_SECRETARY)) {
          menu_itens.push(Constants.LATERAL_MENU_MEMBERS);
        }
        if (UiService.validPermissions(Constants.ROLE_FINANCIAL)) {
          menu_itens.push(Constants.LATERAL_MENU_FINANCY);
        }
        menu_itens.push(Constants.LATERAL_MENU_OUT);
      }
    } catch (e) {
      localStorage.clear();
      window.location.reload();
    }

    return menu_itens;
  }

  static getMenuId(name: string, isHome: boolean = false) {
    let menu_itens: string[];
    if (isHome) {
      menu_itens = [
        Constants.SUPERIOR_MENU_BIRTHDAYS,
        Constants.SUPERIOR_MENU_REGISTER,
        Constants.SUPERIOR_MENU_LOGIN,
      ];
    } else {
      menu_itens = [
        Constants.LATERAL_MENU_PROFILE,
        Constants.LATERAL_MENU_BIBLE_READ,
        Constants.LATERAL_MENU_MEMBERS,
        Constants.LATERAL_MENU_TITHE_OFFER,
        Constants.LATERAL_MENU_FINANCY,
        Constants.LATERAL_MENU_FEED,
        Constants.LATERAL_MENU_PROGRAM,
        Constants.LATERAL_MENU_OUT,
      ];
    }
    const id = menu_itens.indexOf(name);

    return String(id);
  }
}
