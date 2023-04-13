import { UiService } from '../services/ui.service';
import { User } from './User';
import { Caixa } from './caixa';
import { CaixaCategory } from './caixaCategory';
import { CaixaType } from './caixaType';
import { Church } from './church';
import { Tithe } from './tithe';
import { ValidDateObj } from './validDateObj';

export class ImportCaixaExcel {
  church: Church;
  tithes: Tithe[];
  offers: Tithe[];
  inputs: Caixa[];
  outputs: Caixa[];
  constructor(church: Church) {
    this.church = church;
    this.tithes = [];
    this.offers = [];
    this.inputs = [];
    this.outputs = [];
  }

  thereIsAnyData() {
    return (
      this.tithes.length > 0 ||
      this.offers.length > 0 ||
      this.inputs.length > 0 ||
      this.outputs.length > 0
    );
  }

  buildTithe(row: any[], church: Church, isTithe: boolean) {
    let isTartPosition = 0;
    if (!isTithe) {
      isTartPosition = 5;
    }
    const user = new User();
    user.id = row[isTartPosition];
    user.name = row[isTartPosition + 1];
    const validDateObj: ValidDateObj = UiService.validDate(
      row[isTartPosition + 3],
      null,
      true
    );
    if (validDateObj) {
      const tithe = new Tithe(
        row[isTartPosition + 2],
        validDateObj.date,
        user,
        church,
        isTithe
      );
      if (isTithe) {
        this.tithes.push(tithe);
      } else {
        this.offers.push(tithe);
      }
    }
  }
  buildCaixa(
    row: any[],
    church: Church,
    isEntry: boolean,
    categories: CaixaCategory[],
    types: CaixaType[]
  ) {
    let isTartPosition = 10;
    if (!isEntry) {
      isTartPosition = 16;
    }
    let category = new CaixaCategory();
    let caixaType = new CaixaType();
    if (row[isTartPosition + 2]) {
      categories.filter((obj) => {
        if (obj.name.includes(row[isTartPosition + 2])) {
          category = obj;
        }
      });
    }
    if (row[isTartPosition + 3]) {
      types.filter((obj) => {
        if (obj.name.includes(row[isTartPosition + 3])) {
          caixaType = obj;
        }
      });
    }

    const validDateObj: ValidDateObj = UiService.validDate(
      row[isTartPosition + 1],
      null,
      true
    );
    if (validDateObj) {
      const caixa = new Caixa(
        row[isTartPosition],
        validDateObj.date,
        row[isTartPosition + 4],
        church,
        category,
        caixaType,
        isEntry
      );
      if (isEntry) {
        this.inputs.push(caixa);
      } else {
        this.outputs.push(caixa);
      }
    }
  }
}
