import { Constants } from 'src/app/models/constants';
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, EventEmitter, Output } from '@angular/core';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { environment } from 'src/environments/environment';
import * as CriptoJs from 'crypto-js';
import { Md5 } from 'ts-md5/dist/md5';
import { DatePipe } from '@angular/common';
import { ValidDateObj } from '../models/validDateObj';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  @Output()
  static pageMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static caixaAdminEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static bibleProgramEmmiter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static toTop: EventEmitter<any> = new EventEmitter();

  @Output()
  static feedPage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static emitirTo: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static emitirRefreshUserChat: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static pageTitle: EventEmitter<any> = new EventEmitter<any>();

  // // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  static loadImageEmitter: EventEmitter<any> = new EventEmitter<any>();

  static stringNormalization(text: string) {
    return text
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase();
  }
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
    const user = UiService.localGet(Constants.TOKEN).user;
    console.log(user);
    const roleUserIndex = Constants.DEFAULT_ROLES.indexOf(user?.role);
    console.log(roleUserIndex);

    const roleMinIndex = Constants.DEFAULT_ROLES.indexOf(permission);
    console.log(roleMinIndex);

    if (roleUserIndex <= roleMinIndex) {
      return true;
    }

    return false;
  }
  static localRemove(key) {
    const encriptedKey =
      environment.LOCALSTORAGE +
      btoa(key).substring(0, Constants.SIZE_ENCRIPTY_KEY);
    localStorage.removeItem(encriptedKey);
    UiService.localGet(key);
  }
  static localGet(key: string) {
    const encriptedKey =
      environment.LOCALSTORAGE +
      btoa(key).substring(0, Constants.SIZE_ENCRIPTY_KEY);
    const encrypted = localStorage.getItem(encriptedKey);
    if (encrypted) {
      const bytes = CriptoJs.AES.decrypt(encrypted, environment.PRIVATEKEY);
      return JSON.parse(bytes.toString(CriptoJs.enc.Utf8));
    }
    return null;
  }

  static localSet(key: string, data) {
    if (key === Constants.TOKEN) {
      data = data.data;
    }
    const encriptedKey =
      environment.LOCALSTORAGE +
      btoa(key).substring(0, Constants.SIZE_ENCRIPTY_KEY);
    const encypt = JSON.stringify(data);
    const encrypted = CriptoJs.AES.encrypt(
      encypt,
      environment.PRIVATEKEY
    ).toString();
    localStorage.setItem(encriptedKey, encrypted);
  }

  static convertToNumber(value: string) {
    if (!value) {
      value = '0,0';
    }
    const splitDecimal = value.split(',');
    if (splitDecimal.length === 2) {
      console.log(splitDecimal);
      const integerPart = splitDecimal[0]?.replace(/[^\d]+/g, '');
      console.log(integerPart);
      const result = integerPart + '.' + splitDecimal[1];
      console.log(result);
      return parseFloat(result);
    }
    return parseFloat(value);
  }
  static convertToCurrency(value: number) {
    const amount = Number(value).toFixed(2);
    return amount.replace('.', ',');
  }

  static validEmail(email) {
    if (email.length > 9) {
      const regex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      return regex.test(email);
    }
    return true;
  }
  static validDate(date, year = null): ValidDateObj {
    const validDateObj = new ValidDateObj();

    if (!year) {
      year = new Date().getFullYear();
    }
    if (date.length >= 10) {
      const dates = date.split('/');
      if (dates[0] > 24 || dates[0] < 1) {
        validDateObj.message = 'Dia inválido';
      } else if (dates[1] > 12 || dates[1] < 1) {
        validDateObj.message = 'Mês inválido';
      } else if (dates[2] > year || dates[2] < 1) {
        validDateObj.message = 'Ano inválido';
      }

      validDateObj.status = true;
      validDateObj.date = date;
      return validDateObj;
    }
    return null;
  }

  static validTime(time, year = null): ValidDateObj {
    const validDateObj = new ValidDateObj();

    if (time.length >= 5) {
      const times = time.split(':');
      if (times[0] > 24 || times[0] < 0) {
        validDateObj.message = 'Dia inválido';
      } else if (times[1] > 59 || times[1] < 0) {
        validDateObj.message = 'Mês inválido';
      }

      validDateObj.status = true;
      validDateObj.time = times[0] + ':' + times[1];
      return validDateObj;
    }
    return null;
  }

  static getWeekNumber() {
    // Copy date so don't modify original
    const d = new Date(Date.now());
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(
      ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
    // Return array of year and week number
    return weekNo + 1;
  }

  static socialNetworks(op: string) {
    switch (op) {
      case 'w':
        window.open('https://api.whatsapp.com/send?phone=5575983256990');
        break;
      case 'm':
        window.open('mailto:ibnovabetel@gmail.com');
        break;

      case 'i':
        window.open('https://www.instagram.com/ibnovabetel/');
        break;
      case 'y':
        window.open('https://www.youtube.com/c/ibnovabetel');
        break;
    }
  }

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
