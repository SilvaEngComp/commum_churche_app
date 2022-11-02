export class CustomizedMonth {
  id: number;
  name: string;

  constructor(id: number = null) {
    if (!id) {
      id = new Date().getMonth() + 1;
    }
    if (id >= 1 && id <= 12) {
      this.id = id;
      const meses = [
        'Jeneiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
      this.name = meses[id - 1];
    }
  }

  static getMonths() {
    const meses: CustomizedMonth[] = [];
    for (let i = 1; i <= 12; i++) {
      meses.push(new CustomizedMonth(i));
    }
    return meses;
  }

  static monthsOfYear() {
    const monthes: CustomizedMonth[] = [];
    for (let i = 1; i <= 12; i++) {
      monthes.push(new CustomizedMonth(i));
    }
    return monthes;
  }
}
