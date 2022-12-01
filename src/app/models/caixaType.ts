import { Constants } from './constants';

export class CaixaType {
  id: number;
  name: string;

  constructor(name?: string) {
    if (name) {
      const index = Constants.CAIXA_TYPES.indexOf(name);
      if (index >= 0) {
        this.id = index;
        this.name = Constants.CAIXA_TYPES[index];
      }
    }
  }
}
