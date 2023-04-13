import { FilterCaixaComponent } from './../admin/financy/caixa/filter-caixa/filter-caixa.component';
import { Constants } from 'src/app/models/constants';
import { CaixaReportExcelTithe } from './caixaReportExcelTithe';
/* eslint-disable max-len */
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as ExcelProper from 'exceljs';
import { DatePipe } from '@angular/common';
import * as logoFile from './logo.js';
import { FinancySummaryFilter } from './financySummaryFilter';

export class CaixaReportExcelFormat {
  workbook: ExcelProper.Workbook;
  worksheet: ExcelProper.Worksheet;
  constructor() {
    this.workbook = new Excel.Workbook();
  }

  setWorksheetGeneral(
    generalTitle: string,
    worksheetTitle: string,
    data: any[][],
    filter: FinancySummaryFilter,
    isModel: boolean = false
  ) {
    this.worksheet = this.workbook.addWorksheet(worksheetTitle);
    this.setImage(isModel);
    this.setDate(filter, isModel);
    this.setTitle(generalTitle);
    this.setHeadTypeRow(isModel);
    this.setHeadRow(isModel);
    this.worksheet.addRows(data);
  }

  setDate(filter: FinancySummaryFilter, isModel: boolean) {
    //Add row with current date
    const datePipe: DatePipe = new DatePipe('en');
    let date;
    if (isModel) {
      date = 'Data : ' + datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm');
    } else {
      date =
        'Período \n De ' +
        datePipe.transform(filter?.dateI, 'dd/MM/yyyy') +
        ' Até ' +
        datePipe.transform(filter?.dateF, 'dd/MM/yyyy');
    }
    const row = this.worksheet.addRow(['', '', date]);
    this.worksheet.mergeCells('C1:U2');
    row.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
  }
  setTitle(generalTitle: string) {
    // Add new row
    const titleRow = this.worksheet.addRow(['', '', generalTitle]);

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

    this.worksheet.mergeCells('C3:U4');
  }

  setImage(isModel: boolean) {
    const logo = this.workbook.addImage({
      base64: logoFile.logo,
      extension: 'png',
    });
    this.worksheet.addImage(logo, 'A1:B4');

    const logo2 = this.workbook.addImage({
      base64: logoFile.logo,
      extension: 'png',
    });
    if (!isModel) {
      this.worksheet.addImage(logo2, 'V1:W4');
    } else {
      this.worksheet.addImage(logo2, 'T1:U4');
    }
  }

  setHeadTypeRow(isModel: boolean) {
    //Add Header Row
    let headerRow;
    if (!isModel) {
      headerRow = this.worksheet.addRow([
        'Dízimos',
        '',
        '',
        '',
        '',
        '',
        'Ofertas',
        '',
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
      this.worksheet.mergeCells('A5:E5');
      this.worksheet.mergeCells('G5:J5');
      this.worksheet.mergeCells('L5:P5');
      this.worksheet.mergeCells('R5:V5');
    } else {
      headerRow = this.worksheet.addRow([
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
    }

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

  setHeadRow(isModel: boolean) {
    //Add Header Row
    let hearder = [];
    if (!isModel) {
      hearder = hearder.concat(Constants.TITHE_REPORT_HEADER);
      hearder = hearder.concat(Constants.OFFER_REPORT_HEADER);
      hearder = hearder.concat(Constants.CAIXA_REPORT_HEADER);
      hearder = hearder.concat(Constants.CAIXA_REPORT_HEADER);
    } else {
      hearder = hearder.concat(Constants.TITHE_REPORT_HEADER_MODEL);
      hearder = hearder.concat(Constants.OFFER_REPORT_HEADER_MODEL);
      hearder = hearder.concat(Constants.CAIXA_REPORT_HEADER_MODEL);
      hearder = hearder.concat(Constants.CAIXA_REPORT_HEADER_MODEL);
      hearder = hearder.concat(Constants.CATEGORY_REPORT_HEADER_MODEL);
      hearder = hearder.concat(Constants.TYPE_REPORT_HEADER_MODEL);
    }
    hearder.pop();
    const headerRow = this.worksheet.addRow(hearder);
    this.worksheet.mergeCells('W6:X6');
    this.worksheet.mergeCells('Z6:AA6');

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
