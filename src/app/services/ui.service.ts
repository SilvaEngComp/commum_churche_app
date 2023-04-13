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
  static pageMenuHome: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static caixaAdminEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static bibleProgramEmmiter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static toTop: EventEmitter<any> = new EventEmitter();

  @Output()
  static feedPage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static schedulePage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static emitirTo: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static emitirRefreshUserChat: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static pageTitle: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static loadImageEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static mySelectEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static showColorMarkEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static closeColorMarkEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  static colorMarkerVerseAdded: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static returnColorMaker: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  static graphGenerator: EventEmitter<any> = new EventEmitter<any>();

  static checkValidPage(page: any) {
    if (!page || page === '-1' || page == '-2' || page < 0) {
      return false;
    }
    return true;
  }
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
    const exist = user.roles.includes(Constants.ROLE_SUPER_ADMIN);
    if (exist) {
      return true;
    }

    return user.roles.includes(permission);
  }
  // }
  // static validPermissions(permission?: string) {
  //   const user = UiService.localGet(Constants.TOKEN).user;
  //   const roleUserIndex = Constants.DEFAULT_ROLES.indexOf(user?.role);

  //   const roleMinIndex = Constants.DEFAULT_ROLES.indexOf(permission);

  //   if (roleUserIndex <= roleMinIndex) {
  //     return true;
  //   }

  //   return false;
  // }
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
      try {
        const bytes = CriptoJs.AES.decrypt(encrypted, environment.PRIVATEKEY);
        return JSON.parse(bytes.toString(CriptoJs.enc.Utf8));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  static setCurrentPage(page: string) {
    UiService.localSet(Constants.TITLE_CURRENT_PAGE, page);
    UiService.pageTitle.emit(page);
  }

  static localSet(key: string, data) {
    if (key === Constants.TOKEN) {
      if (data?.data) {
        data = data.data;
      }
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
  static validDate(date, year = null, convert: boolean): ValidDateObj {
    const validDateObj = new ValidDateObj();

    if (!year) {
      year = new Date().getFullYear();
    }
    if (date.length >= 8) {
      const dates = date.split('/');

      if (dates[2]?.length === 2) {
        dates[2] = String(year).substring(0, 2) + dates[2];
      }
      if (dates[0] > 24 || dates[0] < 1) {
        validDateObj.message = 'Dia inválido';
      } else if (dates[1] > 12 || dates[1] < 1) {
        validDateObj.message = 'Mês inválido';
      } else if (dates[2] > year || dates[2] < 1) {
        validDateObj.message = 'Ano inválido';
      }

      validDateObj.status = true;
      if (convert) {
        date = dates[2] + '-' + dates[1] + '-' + dates[0];
      }

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
    op = op.toLowerCase();
    switch (op) {
      case 'w':
        window.open(
          `https://api.whatsapp.com/send?phone=557583256990&text=Gostaria%20de%20falar%20com%20a%20secretaria%20da%20Igreja%20Batista%20Nova%20Betel.%20Est%C3%A1%20dispon%C3%ADvel?`
        );
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
      case 's':
        window.open(
          `https://api.whatsapp.com/send?phone=5575992466044&message='Olá! Está disponível?'`
        );
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
    if (!backgroundColor) {
      backgroundColor = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(46,139,87)',
        'rgb(139,0,139)',
        'rgb(255,215,0)',
      ];
    }
    if (!borderColor) {
      borderColor = ['rgba(176,224,230)'];
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
}
