export class CustomizedMonth {
  id: number;
  name: string;
  abbreviation: string;

  constructor(id: number = null, adapt = true) {
    if (id < 0) {
      id = new Date().getMonth() + 1;
    }
    if (id >= 0 && id <= 12) {
      this.id = id;
      const monthes = [
        'Janeiro',
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

      if (adapt) {
        id = id - 1;
      }
      this.name = monthes[id];
      this.abbreviation = monthes[id].substr(0, 3);
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
