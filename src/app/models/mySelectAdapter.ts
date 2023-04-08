import { User } from './User';

export class MySelectAdapter {
  cod: string;
  value: string;
  auxValue: string;

  constructor(cod?: string, value?: string, auxValue?: string) {
    this.value = '';
    if (cod) {
      this.cod = cod;
    }
    if (value) {
      this.value = value;
    }
    if (auxValue) {
      this.auxValue = auxValue;
    }
  }

  static toMySelectAny(list?: any[]) {
    const mySelect: MySelectAdapter[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(new MySelectAdapter(item.id, item.name));
      });
    }
    return mySelect;
  }
  static userToMySelectAny(list?: User[]) {
    const mySelect: MySelectAdapter[] = [];
    if (list) {
      list.filter((item) => {
        mySelect.push(
          new MySelectAdapter(String(item.id), item.name, item?.church?.name)
        );
      });
    }
    return mySelect;
  }
  static toSingleMySelectAny(obj?: any) {
    if (obj) {
      return new MySelectAdapter(obj.id, obj.name);
    }
    return null;
  }
}
