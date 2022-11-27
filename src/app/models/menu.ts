/* eslint-disable @typescript-eslint/prefer-for-of */
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
    const menu_itens: string[] = ['PERFIL', 'MEMBROS', 'FINANCEIRO', 'SAIR'];

    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      let submenu = [];
      if (i === 2) {
        submenu = ['Dízimos', 'Entradas e Saídas'];
      }
      menuGeral.push(new Menu(menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }
  static getMenuMember() {
    const menuGeral: Menu[] = [];
    const menu_itens: string[] = ['PERFIL', 'DÍZIMO', 'SAIR'];

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
