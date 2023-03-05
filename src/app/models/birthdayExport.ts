import { User } from './User';

export class UserCSV {
  name: string;
  birthDate: string;
  church: string;

  constructor(user: User) {
    if (user) {
      if (user.name) {
        this.name = user.name;
      }
      if (user.birthDate) {
        this.birthDate = user.birthDate;
      }

      if (user?.church?.name) {
        this.church = user?.church?.name;
      }
    }
  }

  static getTable(relatorio: UserCSV[]): any[][] {
    const csvtable: any[][] = [];

    relatorio.filter((userCSV) => {
      const relatorioList: any[] = [];
      if (userCSV.name) {
        relatorioList.push(userCSV.name);
      } else {
        relatorioList.push('');
      }
      if (userCSV.birthDate) {
        relatorioList.push(userCSV.birthDate);
      } else {
        relatorioList.push('');
      }
      if (userCSV.church) {
        relatorioList.push(userCSV.church);
      } else {
        relatorioList.push('');
      }
      csvtable.push(relatorioList);
    });
    return csvtable;
  }

  static headersOptions(): HeaderUserCSV[] {
    const options: HeaderUserCSV[] = [];
    const names: string[] = ['Nome', 'Data', 'Organização'];

    names.filter((name) => {
      options.push(new HeaderUserCSV(name));
    });

    return options;
  }

  static header(selectedHeaders: HeaderUserCSV[]): string[] {
    const headerUserCSV: string[] = [];

    selectedHeaders.filter((selected) => {
      headerUserCSV.push(selected.name);
    });
    return headerUserCSV;
  }

  static getRelatorio(users: User[]) {
    const relatorio: UserCSV[] = [];
    let cont = 1;
    users.filter((user) => {
      relatorio.push(new UserCSV(user));
      cont++;
    });

    return relatorio;
  }
}

export class HeaderUserCSV {
  name: string;
  constructor(name?: string, checked: boolean = true) {
    this.name = name;
  }
}
