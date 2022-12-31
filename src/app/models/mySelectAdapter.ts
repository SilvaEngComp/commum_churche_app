export class MySelectAdapter {
  cod: string;
  value: string;

  constructor(cod?: string, value?: string) {
    this.value = '';
    if (cod) {
      this.cod = cod;
    }
    if (value) {
      this.value = value;
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
  static toSingleMySelectAny(obj?: any) {
    if (obj) {
      return new MySelectAdapter(obj.id, obj.name);
    }
    return null;
  }
}
