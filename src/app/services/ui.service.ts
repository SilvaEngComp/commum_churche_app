/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, EventEmitter, Output } from '@angular/core';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { environment } from 'src/environments/environment';
import * as CriptoJs from 'crypto-js';
import { Md5 } from 'ts-md5/dist/md5';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  @Output()
  static emitirMenu: EventEmitter<any> = new EventEmitter();
  @Output()
  static toTop: EventEmitter<any> = new EventEmitter();

  static getCurrentDate() {
    if (UiService.localGet('currentyDate')) {
      return UiService.localGet('currentyDate');
    } else {
      const datePipe = new DatePipe('en');
      return datePipe.transform(Date.now(), 'YYYY-MM-dd');
    }
  }

  static validlocalSet(value: any, key: string, lastHash: any = null) {
    const currentHash = UiService.getHash(value);
    if (lastHash !== currentHash) {
      UiService.localSet(key, value);
      return true;
    }
    return false;
  }

  getLocal() {
    const localProducts = JSON.stringify(UiService.localGet('localProducts'));
    if (localProducts) {
      const md5 = new Md5();
      md5.appendAsciiStr(localProducts);
      const hash = md5.end();
      return { data: JSON.parse(localProducts), hash };
    }
    return null;
  }

  static getHash(value): string {
    const md5 = new Md5();
    const encripted: string = btoa(JSON.stringify(value));
    md5.appendAsciiStr(encripted);
    return String(md5.end());
  }

  static validPermissions(permission?: string) {
    const user = UiService.localGet().user;
    if (user.roles.indexOf('super_admin') >= 0) {
      return true;
    }

    if (user.permissions.indexOf(permission) >= 0) {
      return true;
    }

    return false;
  }
  static localRemove(key) {
    key = btoa(key).substr(0, 8);
    localStorage.removeItem(environment.LOCALSTORAGE + key);
  }
  static localGet(key = 'token') {
    key = btoa(key).substr(0, 8);
    if (localStorage.getItem(environment.LOCALSTORAGE + key)) {
      const encrypted = localStorage.getItem(environment.LOCALSTORAGE + key);
      const bytes = CriptoJs.AES.decrypt(encrypted, environment.PRIVATEKEY);
      return JSON.parse(bytes.toString(CriptoJs.enc.Utf8));
    }
    return null;
  }

  static localSet(key: string, data) {
    if (key === 'token') {
      data = data.data;
    }
    key = btoa(key).substr(0, 8);
    const encypt = JSON.stringify(data);
    const encrypted = CriptoJs.AES.encrypt(
      encypt,
      environment.PRIVATEKEY
    ).toString();
    localStorage.setItem(environment.LOCALSTORAGE + key, encrypted);
  }

  static convertToNumber(value: string) {
    if (!value) {
      value = '0,0';
    }
    let v = value?.replace('.', '');
    v = v.replace(',', '.');
    return parseFloat(v);
  }
  static convertToCurrency(value: number) {
    const amount = String(value.toFixed(2));
    return amount.replace('.', ',');
  }

  constructor() {}

  static buildChartMonth(
    canvas,
    type,
    labels,
    datas,
    datasetLabel,
    backgroundColor?: string[],
    borderColor?: string[]
  ): Chart {
    const datasets = [];
    if (!backgroundColor) {
      backgroundColor = ['rgba(139,0,139, 0.5)'];
    }
    if (!borderColor) {
      borderColor = ['rgba(75,0,130, 1)'];
    }

    const config: ChartConfiguration = {
      type,
      data: {
        labels,
        datasets: [
          {
            data: datas,
            label: datasetLabel,
            backgroundColor,
            borderColor,
            borderWidth: 1,
            barPercentage: 0.8,
            barThickness: 'flex',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    Chart.register(...registerables);
    return new Chart(canvas, config);
  }

  static buildChartYear(
    canvas,
    type,
    labels,
    datas,
    datasetLabel,
    backgroundColor?: string[],
    borderColor?: string[]
  ): Chart {
    const datasets = [];
    console.log('year: ' + datas.length);

    if (!backgroundColor) {
      backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ];
    }
    if (!borderColor) {
      borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ];
    }
    let i = 0;
    datas.filter((data) => {
      datasets.push({
        data,
        label: datasetLabel[i],
        backgroundColor,
        borderColor,
        borderWidth: 1,
        barPercentage: 0.8,
        barThickness: 'flex',
      });
      if (i < datasetLabel.length) {
        i++;
      }
    });

    const config: ChartConfiguration = {
      type,
      data: {
        labels,
        datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    Chart.register(...registerables);
    return new Chart(canvas, config);
  }

  static validaCnpj(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') {
      return false;
    }
    if (cnpj.length != 14) {
      return false;
    }
    // LINHA 10 - Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    ) {
      return false;
    } // LINHA 21

    // Valida DVs LINHA 23 -
    let tamanho: number = cnpj.length - 2;
    let numeros: string = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number(digitos.charAt(1))) {
      return false;
    } // LINHA 49

    return true;
  }

  public static validaCpf(cpf): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    let sum;
    let rest;
    sum = 0;
    if (cpf == '00000000000') {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + Number(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) {
      rest = 0;
    }
    // tslint:disable-next-line: radix
    if (rest != Number(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + Number(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }
    if (rest != Number(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }
}
