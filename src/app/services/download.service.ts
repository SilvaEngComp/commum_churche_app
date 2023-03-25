/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Caixa } from 'src/app/models/caixa';
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExceptionService } from './exception-service.service';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}

  public exportAsExcelFile(json: any[], excelFileName: string, op): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);

    /* generate workbook and add the worksheet */
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, excelFileName);
    workbook.SheetNames = [excelFileName];

    /* save to file */
    XLSX.writeFile(workbook, excelFileName + EXCEL_EXTENSION);

    // const excelBuffer: any = XLSX.write(workbook, {
    //   bookType: 'xlsx',
    //   type: 'array',
    // });

    // if (op === 1) {
    //   this.downloadExcel(excelBuffer, excelFileName);
    // } else {
    //   this.sendEmail(excelBuffer, excelFileName);
    // }
  }

  private downloadExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  private sendEmail(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    //  FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
    const formDta = new FormData();
    formDta.append('file', data, fileName + EXCEL_EXTENSION);
    this.http
      .post<any>(`${environment.API2}/email/send`, formDta, {
        headers: LoginService.getHeaders(true),
      })
      .toPromise()
      .then((resp) => {
        this.exceptionService.openLoading(resp.message);
      });
  }

  downloadXls(data, filename = 'Tabela de Fiis', headerList) {
    const csvData = this.convertToCSV(data, headerList);

    const blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser =
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  download(caixa: Caixa) {
    return this.http.get(caixa?.file, { responseType: 'blob' });
  }

  async toDataURL({ url }: { url }) {
    const blob = await fetch(url).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }

  webDownload(caixa: Caixa, fileName: string) {
    this.http
      .get(`${environment.API2}/caixas/${caixa?.id}`, {
        responseType: 'blob',
        headers: LoginService.getHeaders(),
      })
      .subscribe((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          FileSaver.saveAs(String(reader.result), fileName);
        };

        // FileSaver.saveAs(blob);
      });
  }

  async downloadPDF(caixa: Caixa) {
    const values = caixa?.file.split('.');
    const filename = 'comprovante.' + values[values.length - 1];
    return this.webDownload(caixa, filename);
  }

  convertToCSV(objArray, headerList) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (const index in headerList) {
      row += headerList[index] + ';';
    }

    row = row.slice(0, -1);

    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      let j = 0;

      // tslint:disable-next-line: forin
      for (const index in headerList) {
        const head = headerList[index];
        if (j <= 1) {
          line += array[i][head] + ';';
        } else {
          line += array[i][head] + ';';
        }
        j++;
      }
      str += line + '\r\n';
    }
    return str;
  }
}
