export class CaixaType {
  id: number;
  name: string;

  constructor(id: number) {
    if (id >= 1 && id <= 4) {
      this.id = id;
      switch (id) {
        case 1:
          this.name = 'Entrada';
          break;
        case 2:
          this.name = 'Saída';
          break;
        case 3:
          this.name = 'Fechamento';
          break;
        case 4:
          this.name = 'Fechamento Manual';
          break;
      }
    }
  }
}
