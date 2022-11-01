export class Genero{
    id: number;
    name: string;

    constructor(name?: string) {
        this.name = name;
  }

 static getList() {
    return [
      {
        id: 1,
        name: 'masculino'
      },
      {
        id: 2,
        name: 'feminino'
      },  {
        id: 3,
        name: 'unisex'
      },

    ];
  }
}
