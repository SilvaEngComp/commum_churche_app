/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Caixa } from 'src/app/models/caixa';
import { Constants } from 'src/app/models/constants';
import { TempFile } from 'src/app/models/temFile';
import { Tithe } from 'src/app/models/tithe';
import { DownloadService } from 'src/app/services/download.service';
import { ExcelFinancyRegistrationService } from 'src/app/services/excel-financy-registration.service';
import * as XLSX from 'xlsx';
import { ChurchService } from 'src/app/services/church.service';
import { CaixaTypeService } from 'src/app/services/caixa-type.service';
import { CaixaCategory } from 'src/app/models/caixaCategory';
import { CaixaType } from 'src/app/models/caixaType';
import { ImportCaixaExcel } from 'src/app/models/importCaixaExcel';
import { ExceptionService } from './../../../services/exception-service.service';
import { Church } from './../../../models/church';
@Component({
  selector: 'app-register-by-excel',
  templateUrl: './register-by-excel.component.html',
  styleUrls: ['./register-by-excel.component.scss'],
})
export class RegisterByExcelComponent implements OnInit {
  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();
  uploader: FileUploader = new FileUploader({});
  excelFile: TempFile;
  isValide: boolean;
  isUploading: boolean;
  localPageTitle: string;
  importCaixaExcel: ImportCaixaExcel[];
  caixas: Caixa[];
  tithes: Tithe[];
  churches: Church[];
  categories: CaixaCategory[];
  types: CaixaType[];
  constructor(
    private exeptionService: ExceptionService,
    private excelFinancyRegistrationService: ExcelFinancyRegistrationService,
    private downloadService: DownloadService,
    private churchService: ChurchService,
    private categoryService: CaixaTypeService,
    private caixaTypeService: CaixaTypeService
  ) {}

  ngOnInit() {
    this.importCaixaExcel = [];
    this.localPageTitle = Constants.TITLE_SUMMARY_REGISTER_BY_EXCEL;
    this.load();
  }

  async load() {
    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;

    const responser2 = await this.categoryService.get();
    this.categories = responser2.data;

    const responser3 = await this.caixaTypeService.get();
    this.types = responser3.data;
  }

  clean() {
    this.uploader = new FileUploader({});
    this.isUploading = false;
  }
  getFile(ev: any): File {
    const target: DataTransfer = <DataTransfer>ev.target;
    const file = target.files[0];
    const url = URL.createObjectURL(file);
    this.excelFile = new TempFile(file.name, url, file.type);
    this.excelFile.checkExpectedType([
      'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'csv',
    ]);

    if (this.excelFile.isValid) {
      return file;
    } else {
      this.exeptionService.alertDialog(
        'O formato ' +
          this.excelFile.type +
          'não é um formato válido. Permitido apenas xls, xlsx ou csv',
        'Erro! Formato Inválido!'
      );
      return;
    }
  }

  importFile() {
    document.getElementById('inputFileImport').click();
  }

  onSelect(ev: any) {
    const file = this.getFile(ev);

    if (!file) {
      this.isValide = false;
    } else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.filter((wsname) => {
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          const data: any[][] = XLSX.utils.sheet_to_json(ws, {
            header: 1,
            raw: false,
          });
          // Print the Excel Data

          data.splice(0, 6);
          this.distincData(data, wsname);
        });
      };
      reader.readAsBinaryString(file);
    }
  }

  async distincData(data: any[][], churchName: string) {
    let church;
    this.churches.filter((obj) => {
      if (obj.name.includes(churchName)) {
        church = obj;
      }
    });
    this.tithes = [];
    this.caixas = [];
    const sheet = new ImportCaixaExcel(church);
    data.filter((row) => {
      sheet.buildTithe(row, church, true);
      sheet.buildTithe(row, church, false);
      sheet.buildCaixa(row, church, true, this.categories, this.types);
      sheet.buildCaixa(row, church, false, this.categories, this.types);
    });

    if (sheet.thereIsAnyData()) {
      this.importCaixaExcel.push(sheet);
      console.log(this.importCaixaExcel);
    }
  }

  async download() {
    this.downloadService.buildFinancialReport(
      'Cadastro de Operações Via Planilha',
      true
    );
  }
  back() {
    this.sessionPage.emit(Constants.MENU_FINANCY_OPTION_SUMMARY);
  }

  async upload() {
    this.exeptionService.loadingFunction();
    this.excelFinancyRegistrationService
      .importExcelResgistration(this.importCaixaExcel)
      .then((responser) => {
        console.log(responser);
        this.exeptionService.openLoading(
          'Registro Realizado com Sucesso!',
          'Seu cadastro de entradas e saídas via Excel foi realizado!'
        );
      })
      .catch((error) => this.exeptionService.error(error));
  }
}
