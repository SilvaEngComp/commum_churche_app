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
    const menu_itens: string[] = ['PERFIL', 'MEMBROS', 'SAIR'];

    let cont = 0;
    for (let i = 0; i < menu_itens.length; i++) {
      let submenu = [];
      if (i === 1) {
        submenu = ['Cadastro', 'Lista de Membros'];
      }
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
      let submenu = [];
      if (i === 1) {
        submenu = ['Cadastro', 'Lista de Membros'];
      }
      menuGeral.push(new Menu(menu_itens[i], submenu));
      cont++;
    }

    return menuGeral;
  }
}
