import { UiService } from '../services/ui.service';
import { User } from './User';
import { Caixa } from './caixa';
import { CaixaCategory } from './caixaCategory';
import { CaixaType } from './caixaType';
import { Church } from './church';
import { ConstantMessages } from './messages';
import { Tithe } from './tithe';
import { ValidDateObj } from './validDateObj';

export class ImportCaixaExcel {
  church: Church;
  tithes: Tithe[];
  offers: Tithe[];
  inputs: Caixa[];
  outputs: Caixa[];
  constructor(church?: Church) {
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

  buildTithe(row: any[], church: Church, isTithe: boolean, rowNumber: number) {
    let isTartPosition = 0;
    if (!isTithe) {
      isTartPosition = 5;
    }

    if (row[isTartPosition + 3] && row[isTartPosition + 2]) {
      const user = new User();
      user.id = row[isTartPosition];
      user.name = row[isTartPosition + 1];
      let date = row[isTartPosition + 3];
      let amount = UiService.convertToNumber(row[isTartPosition + 2]);
      const problems: string[] = [];
      const validDateObj: ValidDateObj = UiService.validDate(date, null, true);

      if (validDateObj?.status) {
        date = validDateObj?.date;
      } else {
        if (!validDateObj?.date) {
          date = '';
        }
        problems.push(validDateObj?.message);
      }

      if (!amount) {
        amount = -1;
        problems.push(ConstantMessages.AMOUNT_INVALID);
      }

      const tithe = new Tithe(
        amount,
        date,
        user,
        church,
        isTithe,
        rowNumber,
        problems
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
    types: CaixaType[],
    rowNumber: number,
    wallet: number
  ) {
    let isTartPosition = 10;
    if (!isEntry) {
      isTartPosition = 16;
    }

    if (
      row[isTartPosition] &&
      row[isTartPosition + 1] &&
      row[isTartPosition + 2]
    ) {
      const problems: string[] = [];
      let amount = UiService.convertToNumber(row[isTartPosition]);
      const description = row[isTartPosition + 4];
      let date = row[isTartPosition + 1];
      let category = null;
      let caixaType = null;
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

      const validDateObj: ValidDateObj = UiService.validDate(date, null, true);

      if (validDateObj?.status) {
        date = validDateObj?.date;
      } else {
        if (!validDateObj?.date) {
          date = '';
        }
        problems.push(validDateObj?.message);
      }

      if (!amount) {
        amount = -1;
        problems.push(ConstantMessages.AMOUNT_INVALID);
      }
      if (!category) {
        problems.push(ConstantMessages.CAIXA_CATEGORY_INVALID);
      }
      if (!caixaType && row[isTartPosition + 3]) {
        problems.push(ConstantMessages.CAIXA_SUBCATEGORY_INVALID);
      }

      if (!isEntry) {
        if (!description) {
          problems.push(ConstantMessages.CAIXA_DESCRIPTION_INVALID);
        }
      }

      const caixa = new Caixa(
        amount,
        date,
        description,
        church,
        category,
        caixaType,
        isEntry,
        wallet,
        rowNumber,
        problems
      );
      if (isEntry) {
        this.inputs.push(caixa);
      } else {
        this.outputs.push(caixa);
      }
    }
  }
}
