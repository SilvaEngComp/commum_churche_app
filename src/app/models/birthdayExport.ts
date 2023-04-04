import { User } from './User';

export class UserCSV {
  name: string;
  birthDate: string;
  church: string;
  isBaptized: string;
  inputMethod: string;

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
      if (user?.inputMethod?.name) {
        this.inputMethod = user?.inputMethod?.name;
      }
      if (user?.isBaptized) {
        this.isBaptized = 'SIM';
      } else {
        this.isBaptized = 'NÃO';
      }
    }
  }

  static getTable(relatorio: UserCSV[]): any[][] {
    const csvtable: any[][] = [];

    csvtable.push(UserCSV.headersOptions());
    relatorio.filter((userCSV) => {
      const relatorioList: BodyCSV[] = [];
      if (userCSV?.name) {
        relatorioList.push(new BodyCSV(userCSV.name));
      } else {
        relatorioList.push(new BodyCSV(''));
      }
      if (userCSV.birthDate) {
        relatorioList.push(new BodyCSV(userCSV.birthDate));
      } else {
        relatorioList.push(new BodyCSV(''));
      }
      if (userCSV.church) {
        relatorioList.push(new BodyCSV(userCSV.church));
      } else {
        relatorioList.push(new BodyCSV(''));
      }

      if (userCSV.isBaptized) {
        relatorioList.push(new BodyCSV(userCSV.isBaptized));
      } else {
        relatorioList.push(new BodyCSV('NÃO'));
      }
      if (userCSV.inputMethod) {
        relatorioList.push(new BodyCSV(userCSV.inputMethod));
      } else {
        relatorioList.push(new BodyCSV(''));
      }
      csvtable.push(relatorioList);
    });
    return csvtable;
  }

  static headersOptions(): HeaderCSV[] {
    const options: HeaderCSV[] = [];
    const names: string[] = [
      'Nome',
      'Data de Nascimento',
      'Organização',
      'Batizado',
      'Ingresso por',
    ];

    names.filter((name) => {
      options.push(new HeaderCSV(name));
    });

    return options;
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

export class HeaderCSV {
  v: string;
  s: any;
  constructor(value: string) {
    this.v = value;
    this.s = {
      font: {
        bold: true,
        background: { rgb: 'FF0000' },
        name: 'Arial Black',
        sz: 24,
      },
    };
  }
}
export class BodyCSV {
  v: string;
  s: any;
  constructor(value: string) {
    this.v = value;
    this.s = { font: { name: 'Courier', sz: 24 } };
  }
}
