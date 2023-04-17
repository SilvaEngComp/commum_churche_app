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
  setInfoWorksheet() {
    this.worksheet = this.workbook.addWorksheet('Instruções');
    this.setImage(true);
    this.setInfoDescription();

    this.generateInfoData();
  }

  setTitleInfo(row: any[]) {
    // Add new row
    const titleRow = this.worksheet.addRow(row);

    // Cell Style : Fill and Border
    titleRow.eachCell((cell) => {
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

    titleRow.font = {
      name: 'Arial',
      family: 4,
      size: 24,
      color: { argb: '000000' },
      underline: 'single',
      bold: true,
    };
  }
  setDataInfo(rows: any[][]) {
    // Add new row
    rows.filter((row) => {
      const titleRow = this.worksheet.addRow(row);

      // Set font, size and style in title row.

      titleRow.font = {
        name: 'Comic Sans MS',
        family: 4,
      };

      titleRow.alignment = {
        horizontal: 'center',
        vertical: 'distributed',
        wrapText: true,
      };
    });
  }
  generateInfoData() {
    this.setTitleInfo(['', '', '', 'DÍZIMOS E OFERTAS']);
    this.worksheet.mergeCells('D5:L6');

    this.setDataInfo([
      [
        '',
        '',
        '',
        'FEF',
        'Código de referência do membro',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'DIZIMISTA',
        'Nome do membro do membro',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'VALOR',
        'Valor do a ser registrado',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'DATA',
        'Valor de registro do recebimento do valor',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
    ]);
    for (let i = 7; i <= 10; i++) {
      this.worksheet.mergeCells('E' + i + ':J' + i);
      this.worksheet.mergeCells('K' + i + ':L' + i);
    }
    this.worksheet.addRow([]);

    this.setTitleInfo(['', '', '', 'ENTRADAS']);
    this.worksheet.mergeCells('D12:L13');

    this.setDataInfo([
      [
        '',
        '',
        '',
        'VALOR',
        'Valor do a ser registrado',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'DATA',
        'Valor de registro do recebimento do valor',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'CATEGORIA',
        'Categoria da entrada. Uma lista das categorias existentes é apresentada na coluna (X). \n Copie e cole o nome exato da categoria',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'SUBCATEGORIA',
        'Subcategoria da entrada. Uma lista das subcategorias existentes é apresentada na coluna (AA). \n Copie e cole o nome exato da subcategoria',
        '',
        '',
        '',
        '',
        '',
        'Opcional',
      ],
      [
        '',
        '',
        '',
        'DESCRIÇÃO',
        'Utilize este campo para apresentar alguma informação relevante sobre a entrada',
        '',
        '',
        '',
        '',
        '',
        'Opcional',
      ],
    ]);
    for (let i = 14; i <= 18; i++) {
      this.worksheet.mergeCells('E' + i + ':J' + i);
      this.worksheet.mergeCells('K' + i + ':L' + i);
    }
    this.worksheet.addRow([]);
    this.setTitleInfo(['', '', '', 'SAÍDAS']);
    this.worksheet.mergeCells('D20:L21');
    this.setDataInfo([
      ['', '', '', 'VALOR', 'Valor do a ser registrado', 'OBRIGATÓRIO'],
      [
        '',
        '',
        '',
        'DATA',
        'Valor de registro do recebimento do valor',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'CATEGORIA',
        'Categoria da saída. Uma lista das categorias existentes é apresentada na coluna (X). \n Copie e cole o nome exato da categoria',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
      ],
      [
        '',
        '',
        '',
        'SUBCATEGORIA',
        'Subcategoria da saída. Uma lista das subcategorias existentes é apresentada na coluna (AA). \n Copie e cole o nome exato da subcategoria',
        '',
        '',
        '',
        '',
        '',
        'Opcional',
      ],
      [
        '',
        '',
        '',
        'DESCRIÇÃO',
        'Utilize este campo para apresentar alguma informação relevante sobre a saída',
        '',
        '',
        '',
        '',
        '',
        'OBRIGATÓRIO',
        '',
      ],
    ]);
    for (let i = 22; i <= 26; i++) {
      this.worksheet.mergeCells('E' + i + ':J' + i);
      this.worksheet.mergeCells('K' + i + ':L' + i);
    }
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
        '',
        'Saídas',
        '',
        '',
        '',
        '',
        '',
      ]);
      this.worksheet.mergeCells('A5:D5');
      this.worksheet.mergeCells('F5:I5');
      this.worksheet.mergeCells('K5:P5');
      this.worksheet.mergeCells('R5:W5');
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
    if (isModel) {
      this.worksheet.mergeCells('W6:X6');
      this.worksheet.mergeCells('Z6:AA6');
    }

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

  setInfoDescription() {
    //Add Header Row
    const row = this.worksheet.addRow([
      '',
      '',
      'Através dessa planilha é possível cadastrar  vários registros financeiros de uma só vez. \n Atente-se às regras e bom trabalho',
    ]);

    // Set font, size and style in title row.
    row.font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };

    row.alignment = {
      horizontal: 'center',
      vertical: 'distributed',
      wrapText: true,
    };

    this.worksheet.mergeCells('C1:U4');
  }
}
