/* eslint-disable max-len */
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from 'exceljs';
import { DatePipe } from '@angular/common';
import * as logoFile from './logo.js';
export class UserExcelFormat {
  workbook: ExcelProper.Workbook;
  worksheet: ExcelProper.Worksheet;
  constructor() {
    this.workbook = new Excel.Workbook();
  }

  setWorksheet(
    generalTitle: string,
    title: string,
    header: string[],
    data: any[][]
  ) {
    this.worksheet = this.workbook.addWorksheet(title);
    this.setImage();
    this.setDate();
    this.setTitle(generalTitle);
    this.setHeadRow(header);

    this.worksheet.addRows(data);
  }

  setDate() {
    //Add row with current date
    const datePipe: DatePipe = new DatePipe('en');
    const row = this.worksheet.addRow([
      '',
      'Data : ' + datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm'),
    ]);
    this.worksheet.mergeCells('B1:D2');
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

    this.worksheet.mergeCells('A3:E4');
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

    this.worksheet.addImage(logo2, 'E1:E2');
  }

  setHeadRow(header: string[]) {
    //Add Header Row
    const headerRow = this.worksheet.addRow(header);

    // Cell Style : Fill and Border
    // Cell Style : Fill and Border
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'darkGray',
        fgColor: { argb: '71c3ce' },
        bgColor: { argb: '71c3ce' },
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
      color: { argb: '000000' },
      underline: 'single',
      bold: true,
    };
  }
}
