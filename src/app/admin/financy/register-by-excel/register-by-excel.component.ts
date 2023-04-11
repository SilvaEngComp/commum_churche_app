/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Caixa } from 'src/app/models/caixa';
import { Constants } from 'src/app/models/constants';
import { TempFile } from 'src/app/models/temFile';
import { Tithe } from 'src/app/models/tithe';
import { DownloadService } from 'src/app/services/download.service';
import { ExcelFinancyRegistrationService } from 'src/app/services/excel-financy-registration.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import * as XLSX from 'xlsx';
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
  caixas: Caixa[];
  tithes: Tithe[];
  constructor(
    private exeptionService: ExceptionService,
    private excelFinancyRegistrationService: ExcelFinancyRegistrationService,
    private downloadService: DownloadService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.localPageTitle = Constants.TITLE_SUMMARY_REGISTER_BY_EXCEL;
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
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          // Print the Excel Data
          data.splice(0, 6);
          console.log(data);
        });
      };
      reader.readAsBinaryString(file);
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
    if (this.isValide) {
      this.excelFinancyRegistrationService
        .importExcelResgistration(this.caixas, this.tithes)
        .then((responser) => {});
    } else {
      this.exeptionService.alertDialog(
        'Selecione um arquivo válido no formato  xls, xlsx ou csv',
        'Arquivo inválido!'
      );
    }
  }
}
