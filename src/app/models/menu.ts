/* eslint-disable @typescript-eslint/prefer-for-of */

import { Constants } from './constants';

/* eslint-disable @typescript-eslint/naming-convention */
export class Menu {
  name: string;
  submenu: string[];
  showSub: boolean;

  constructor(name?: string, submenu?: string[]) {
    this.name = name;
    this.submenu = submenu;
  }

  static getMenuAdmin() {
    const menuGeral: Menu[] = [];
    const menu_itens: string[] = [
      Constants.LATERAL_MENU_MEMBERS,
      Constants.LATERAL_MENU_TITHE_OFFER,
      Constants.LATERAL_MENU_FINANCY,
      Constants.LATERAL_MENU_BIBLE_READ,
      Constants.LATERAL_MENU_OUT,
    ];

    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      let submenu = [];
      if (menu_itens[i] === Constants.LATERAL_MENU_FINANCY) {
        submenu = [
          Constants.LATERAL_SUBMENU_TITHE_OFFER,
          Constants.LATERAL_SUBMENU_SUMMARY,
        ];
      }
      menuGeral.push(new Menu(menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }
  static getMenuMember() {
    const menuGeral: Menu[] = [];
    const menu_itens: string[] = [
      Constants.LATERAL_MENU_TITHE_OFFER,
      Constants.LATERAL_MENU_BIBLE_READ,
      Constants.LATERAL_MENU_OUT,
    ];

    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      const submenu = [];

      menuGeral.push(new Menu(menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }
  static getMenuHome() {
    const menuGeral: Menu[] = [];
    const menu_itens: string[] = ['CADASTRO', 'LOGIN'];

    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      const submenu = [];

      menuGeral.push(new Menu(menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }
}
