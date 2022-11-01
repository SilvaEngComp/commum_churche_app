import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBrl',
})
export class CurrencyBrlPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value === '') {
      value = '0.00';
    } else {
      const money = Number(value);
      let valor: string[] = [];
      const ordem: number = this.checkOrdem(money);
      let valorBrl = '';

      if (ordem - 3 > 0) {
        valor = money.toFixed(2).split('.');
        valorBrl = this.pontoMilhar(valor[0], ordem);
        return valorBrl + ',' + valor[1];
      } else {
        return money.toFixed(2).replace('.', ',');
      }
    }
  }

  //Função responsável por serparar as classes inteiras com ponto
  pontoMilhar(valor: string, ordem: number) {
    const partes: string[] = [];
    let fim: number = valor.length;
    let inicio: number = fim - 3;
    for (let i = 0; i < ordem / 3; i++) {
      partes.push(valor.substring(fim, inicio));

      inicio -= 3;
      fim -= 3;

      if (inicio < 0) {
        inicio = 0;
      }
    }

    fim = partes.length - 1;
    let inteiro = partes[fim];
    for (let i = fim - 1; i >= 0; i--) {
      inteiro = `${inteiro} .${partes[i]}`;
    }

    return inteiro;
  }

  //Função responsável por calcular a ordem do número
  checkOrdem(value: number): number {
    // return value;
    let ordem = 1;
    let i = 10;
    while (i < 1000000000000000000000000) {
      if (value / i < 1) {
        break;
      }

      ordem += 1;
      i = Number(i) * 10;
    }

    return ordem;
  }
}
