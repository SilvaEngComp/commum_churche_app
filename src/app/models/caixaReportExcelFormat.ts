import { Constants } from 'src/app/models/constants';
import { CaixaReportExcelTithe } from './caixaReportExcelTithe';
/* eslint-disable max-len */
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from 'exceljs';
import { DatePipe } from '@angular/common';
import * as logoFile from './logo.js';

export class CaixaReportExcelFormat {
  workbook: ExcelProper.Workbook;
  worksheet: ExcelProper.Worksheet;
  constructor() {
    this.workbook = new Excel.Workbook();
  }

  setWorksheetGeneral(generalTitle: string, tithes: any[][]) {
    this.worksheet = this.workbook.addWorksheet('Totais');
    this.setImage();
    this.setDate();
    this.setTitle(generalTitle);
    this.setHeadTypeRow();
    this.setHeadRow();
  }

  setDate() {
    //Add row with current date
    const datePipe: DatePipe = new DatePipe('en');
    const row = this.worksheet.addRow([
      '',
      'Data : ' + datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
    ]);
    this.worksheet.mergeCells('B1:T2');
    row.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
  }
  setTitle(generalTitle: string) {
    // Add new row
    const titleRow = this.worksheet.addRow([generalTitle]);

    // Set font, size and style in title row.
    titleRow.font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };

    titleRow.alignment = {
      horizontal: 'center',
      vertical: 'distributed',
      wrapText: true,
    };

    this.worksheet.mergeCells('A3:U4');
  }

  setImage() {
    const logo = this.workbook.addImage({
      base64: logoFile.logo,
      extension: 'png',
    });

    this.worksheet.addImage(logo, 'A1:A2');

    const logo2 = this.workbook.addImage({
      base64: logoFile.logo,
      extension: 'png',
    });

    this.worksheet.addImage(logo2, 'U1:U2');
  }

  setHeadTypeRow() {
    //Add Header Row
    const headerRow = this.worksheet.addRow([
      'Dízimos',
      '',
      '',
      '',
      '',
      'Ofertas',
      '',
      '',
      '',
      '',
      'Entradas',
      '',
      '',
      '',
      '',
      '',
      'Saídas',
      '',
      '',
      '',
      '',
    ]);

    this.worksheet.mergeCells('A5:D5');
    this.worksheet.mergeCells('F5:I5');
    this.worksheet.mergeCells('K5:O5');
    this.worksheet.mergeCells('Q5:U5');

    // Cell Style : Fill and Border
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'darkGray',
        fgColor: { argb: 'f4f5f8' },
        bgColor: { argb: '024152' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'double' },
        right: { style: 'thin' },
      };

      cell.style.alignment = {
        horizontal: 'center',
        vertical: 'distributed',
        wrapText: true,
      };
    });

    headerRow.font = {
      name: 'Arial',
      family: 4,
      size: 12,
      color: { argb: 'f4f5f8' },
      underline: 'single',
      bold: true,
    };
  }

  setHeadRow() {
    //Add Header Row
    let hearder = Constants.TITHE_REPORT_HEADER;
    hearder.push('');
    hearder = hearder.concat(Constants.TITHE_REPORT_HEADER);
    hearder = hearder.concat(Constants.CAIXA_REPORT_HEADER);
    hearder.push('');
    hearder = hearder.concat(Constants.CAIXA_REPORT_HEADER);
    const headerRow = this.worksheet.addRow(hearder);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'darkGray',
        fgColor: { argb: 'f4f5f8' },
        bgColor: { argb: '024152' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'double' },
        right: { style: 'thin' },
      };

      cell.style.alignment = {
        horizontal: 'center',
        vertical: 'distributed',
        wrapText: true,
      };
    });

    headerRow.font = {
      name: 'Arial',
      family: 4,
      size: 12,
      color: { argb: 'f4f5f8' },
      underline: 'single',
      bold: true,
    };
  }
}
