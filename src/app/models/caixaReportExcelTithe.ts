import { Constants } from 'src/app/models/constants';
/* eslint-disable max-len */
import * as ExcelProper from 'exceljs';
export class CaixaReportExcelTithe {
  worksheet: ExcelProper.Worksheet;
  constructor(worksheet: ExcelProper.Worksheet) {
    this.worksheet = worksheet;
  }

  setWorksheet(data: any[][]) {
    this.worksheet.addRows(data);
  }
}
