export class CustomizedMonth {
  id: number;
  name: string;
  abbreviation: string;

  constructor(id: number = null) {
    if (!id) {
      id = new Date().getMonth() + 1;
    }
    if (id >= 1 && id <= 12) {
      this.id = id;
      const monthes = [
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
      console.log(id);
      this.name = monthes[id - 1];
      this.abbreviation = monthes[id - 1].substr(0, 3);
    }
  }

  static getMonths() {
    const monthes: CustomizedMonth[] = [];
    for (let i = 1; i <= 12; i++) {
      monthes.push(new CustomizedMonth(i));
    }
    return monthes;
  }

  static monthsOfYear() {
    const monthes: CustomizedMonth[] = [];
    for (let i = 1; i <= 12; i++) {
      monthes.push(new CustomizedMonth(i));
    }
    return monthes;
  }
}
