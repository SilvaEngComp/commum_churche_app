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

  static getMenu(permission?: string, isHome: boolean = false) {
    if (isHome) {
      permission = Constants.MENU_HOME;
    }
    const menuGeral: Menu[] = [];
    const menu_itens: string[] = this.getMenuByPermission(permission);
    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      const submenu = [];
      // if (menu_itens[i] === Constants.LATERAL_MENU_FINANCY) {
      //   submenu = [Constants.LATERAL_SUBMENU_SUMMARY];
      // }
      const id = Menu.getMenuId(menu_itens[i]);
      menuGeral.push(new Menu(id, menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }

  static getMenuByPermission(permission: string) {
    const menu_itens: string[] = [];
    if (permission === Constants.MENU_HOME) {
      menu_itens.push(Constants.SUPERIOR_MENU_REGISTER);
      menu_itens.push(Constants.SUPERIOR_MENU_LOGIN);
    } else if (permission === Constants.ROLE_MEMBER) {
      menu_itens.push(Constants.LATERAL_MENU_BIBLE_READ);
      menu_itens.push(Constants.LATERAL_MENU_TITHE_OFFER);
    } else {
      menu_itens.push(Constants.LATERAL_MENU_BIBLE_READ);
      menu_itens.push(Constants.LATERAL_MENU_MEMBERS);
      menu_itens.push(Constants.LATERAL_MENU_FINANCY);
    }
    menu_itens.push(Constants.LATERAL_MENU_OUT);

    return menu_itens;
  }

  static getMenuId(name: string) {
    const menu_itens: string[] = [
      Constants.LATERAL_MENU_BIBLE_READ,
      Constants.SUPERIOR_MENU_LOGIN,
      Constants.SUPERIOR_MENU_REGISTER,
      Constants.LATERAL_MENU_MEMBERS,
      Constants.LATERAL_MENU_TITHE_OFFER,
      Constants.LATERAL_MENU_FINANCY,
      Constants.LATERAL_MENU_OUT,
    ];

    const id = menu_itens.indexOf(name);

    return String(id);
  }
}
