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
import { CaixaCategoryService } from 'src/app/services/caixa-category.service';
import { UiService } from 'src/app/services/ui.service';
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
    private categoryService: CaixaCategoryService,
    private caixaTypeService: CaixaTypeService
  ) {}

  ngOnInit() {
    this.importCaixaExcel = [];
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_SUMMARY
    );
    UiService.subPageTitle.emit(Constants.TITLE_SUMMARY_REGISTER_BY_EXCEL);
    this.load();
  }

  async load() {
    this.isUploading = true;
    const churchResponser = await this.churchService.get();
    this.churches = churchResponser.data;

    const responser2 = await this.categoryService.get();
    this.categories = responser2.data;

    const responser3 = await this.caixaTypeService.get();
    this.types = responser3.data;

    if (this.categories) {
      this.isUploading = false;
    }
  }

  getFile(ev: any): File {
    const target: DataTransfer = <DataTransfer>ev.target;
    const file = target.files[0];
    const url = URL.createObjectURL(file);
    this.excelFile = new TempFile(file, file.name, url, file.type);
    this.excelFile.checkExpectedType([
      'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'vnd.ms-excel',
      'xls',
      'xlsx',
      'vnd.ms-excel',
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
      this.clean();
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
          if (!wsname.toLocaleLowerCase().includes('instruções')) {
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data: any[][] = XLSX.utils.sheet_to_json(ws, {
              header: 1,
              raw: false,
            });
            // Print the Excel Data

            data.splice(0, 6);
            this.distincData(data, wsname);
          }
        });

        if (this.importCaixaExcel?.length <= 0) {
          console.log(this.importCaixaExcel);
          this.exeptionService.alertDialog(
            'Não existem linhas com dados validos para importação. Revise a planilha e importe novamente'
          );
          this.clean();
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  setCategory(caixaCategory: CaixaCategory) {
    if (caixaCategory) {
      window.location.reload();
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
    let cont = 7;
    data.filter((row) => {
      sheet.buildTithe(row, church, true, cont);
      sheet.buildTithe(row, church, false, cont);
      sheet.buildCaixa(row, church, true, this.categories, this.types, cont, 1);
      sheet.buildCaixa(
        row,
        church,
        false,
        this.categories,
        this.types,
        cont,
        1
      );
      cont++;
    });
    if (sheet.thereIsAnyData()) {
      this.importCaixaExcel.push(sheet);
    }
  }

  clean() {
    this.importCaixaExcel = [];
    this.excelFile = null;
    this.uploader = new FileUploader({});
    this.isUploading = false;
  }

  download() {
    this.isUploading = true;
    setTimeout(async () => {
      await this.downloadService.buildFinancialReport(
        'Cadastro de Operações Via Planilha',
        true
      );
      this.isUploading = false;
    }, 1000);
  }

  async upload() {
    if (this.checkIsDataValide()) {
      this.exeptionService.loadingFunction();
      this.excelFinancyRegistrationService
        .importExcelResgistration(this.importCaixaExcel)
        .then((responser) => {
          this.clean();
          this.exeptionService.openLoading(
            'Registro Realizado com Sucesso!',
            'Seu cadastro de entradas e saídas via Excel foi realizado!'
          );
        })
        .catch((error) => this.exeptionService.error(error));
    } else {
      this.exeptionService.alertDialog(
        'Dados Inválidos!',
        'Existem dados inválidos importados da planilha. Corrija antes de enviar'
      );
    }
  }

  checkIsDataValide() {
    let flag = true;
    this.importCaixaExcel.filter((obj) => {
      obj.inputs.filter((input) => {
        if (input?.problems?.length > 0) {
          flag = false;
        }
      });
      obj.tithes.filter((input) => {
        if (input?.problems?.length > 0) {
          flag = false;
        }
      });
      obj.offers.filter((input) => {
        if (input?.problems?.length > 0) {
          flag = false;
        }
      });
      obj.outputs.filter((input) => {
        if (input?.problems?.length > 0) {
          flag = false;
        }
      });
    });
    return flag;
  }
}
