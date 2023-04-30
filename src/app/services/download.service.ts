/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
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
import * as ExcelProper from 'exceljs';
import { ChurchService } from './church.service';
import { UserExcelFormat } from '../models/userExcelFormat';
import { User } from '../models/User';
import { Church } from '../models/church';
import { CaixaReportExcelFormat } from '../models/caixaReportExcelFormat';
import { UiService } from './ui.service';
import { Constants } from '../models/constants';
import { InputsReport, SummaryInput } from '../models/sumaryInput';
import { OutputReport, SummaryOutput } from '../models/sumaryOutput';
import { UserService } from './user.service';
import { CaixaTypeService } from './caixa-type.service';
import { CaixaCategoryService } from './caixa-category.service';
import { CaixaCategory } from '../models/caixaCategory';
import { CaixaType } from '../models/caixaType';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActionSheetController, Platform } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
const APP_DIRECTORY_LIST = [
  Directory.Documents,
  Directory.Data,
  Directory.Cache,
  Directory.Library,
  Directory.ExternalStorage,
  Directory.External,
];

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  EXCEL_EXTENSION = '.xlsx';
  base64: string;
  currentFolder = '';
  folderContent = [];
  fileName: string;
  folder: string;
  filename: any;
  APP_DIRECTORY: any;
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private churchService: ChurchService,
    private userService: UserService,
    private caixaTypeService: CaixaTypeService,
    private categoryService: CaixaCategoryService,
    private platform: Platform,
    private fileOpener: FileOpener,
    private actionCtrl: ActionSheetController
  ) {}

  testDownloadXls(
    workbook: ExcelProper.Workbook,
    fileName: string,
    folder: string
  ) {
    workbook.xlsx.writeBuffer().then(async (buffer) => {
      const blob = new Blob([buffer], {
        type: this.EXCEL_TYPE,
      });
      this.fileName = fileName + '.xls';
      this.folder = folder;
      if (this.platform.is('capacitor')) {
        this.convertBlobToBase64(blob);
      } else {
        FileSaver.saveAs(blob, this.fileName, { autoBom: true });
      }
    });
  }

  async getCurrentFolder() {
    let folderContent = null;
    let cont = 0;
    while (cont < APP_DIRECTORY_LIST?.length) {
      this.APP_DIRECTORY = APP_DIRECTORY_LIST[cont];
      folderContent = await Filesystem.readdir({
        directory: this.APP_DIRECTORY,
        path: this.currentFolder,
      });
      cont++;
      if (this.APP_DIRECTORY) {
        break;
      }
    }

    console.log(folderContent);

    // The directory array is just strings
    // We add the information isFile to make life easier
    this.folderContent = folderContent.files.filter((file) => {
      if (file.name === this.folder) {
        return file;
      }
    });

    if (this.folderContent.length >= 0) {
      const path = this.folder + '/' + this.fileName;
      this.registerFile(path);
    } else {
      this.createFolder();
    }
  }

  registerFile(path: string) {
    Filesystem.writeFile({
      path,
      data: this.base64,
      recursive: true,
      directory: this.APP_DIRECTORY,
    })
      .then((response) => {
        this.openFile(response.uri);
      })
      .catch((error) => {
        console.log(error);
        this.exceptionService.alertDialog('Falha ao realizar download!');
      });
  }

  async createFolder() {
    let path = '';
    Filesystem.mkdir({
      path: this.folder,
      directory: this.APP_DIRECTORY,
    })
      .then(() => {
        path = this.folder + '/' + this.fileName;
        this.registerFile(path);
      })
      .catch(() => {
        path = this.fileName;
        this.registerFile(path);
      });
  }

  convertBlobToBase64(blob: Blob) {
    const reader: FileReader = new FileReader();
    reader.onload = async (_e: any) => {
      this.base64 = reader.result as string;
      await this.getCurrentFolder();
    };

    reader.readAsDataURL(blob);
  }

  async openFile(uri: string) {
    const alert = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Abrir Arquivo',
          handler: () => {
            this.fileOpener.open(uri, 'application/vnd.ms-excel');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.exceptionService.alertDialog(
              `Download de ${this.filename} concluído na pasta ${this.folder}! `
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async buildUserExcel(users: User[], generalTitle: string) {
    const userExcelFormat = new UserExcelFormat();
    const header = [
      'Nome',
      'Organização',
      'Data de Nascimento',
      'Batizado',
      'Ingresso por',
    ];

    let title;

    let data = [];
    users.sort((a, b) => (a.church?.name > b.church?.name ? 1 : -1));
    const churchResponser = await this.churchService.get();

    const churches: Church[] = churchResponser.data;
    churches.filter((church) => {
      users.filter((user) => {
        if (church?.id === user?.church?.id) {
          const isBaptized = user?.isBaptized ? 'SIM' : 'NÃO';

          data.push([
            user?.name,
            user?.church?.name,
            user?.birthDate,
            isBaptized,
            user?.inputMethod?.name,
          ]);
        }
      });

      userExcelFormat.setWorksheet(generalTitle, church?.name, header, data);
      data = [];
    });

    data = [];
    users.filter((user) => {
      if (!user?.church || user?.church?.name === '') {
        const isBaptized = user?.isBaptized ? 'SIM' : 'NÃO';

        if (title !== user?.church?.name) {
          userExcelFormat.setWorksheet(
            generalTitle,
            'Sem Organização',
            header,
            data
          );

          title = user?.church?.name;
          data = [];
        }
        data.push([
          user?.name,
          user?.church?.name,
          user?.birthDate,
          isBaptized,
          user?.inputMethod?.name,
        ]);
      }
    });

    this.exceptionService.loadingFunction('Processando Tabela Excel...');
    this.testDownloadXls(
      userExcelFormat?.workbook,
      generalTitle,
      Constants.SECRETARY_FOLDER
    );
  }

  async buildFinancialReport(generalTitle: string, isModel: boolean = false) {
    const userExcelFormat = new CaixaReportExcelFormat();

    const churchResponser = await this.churchService.get();
    const churches: Church[] = churchResponser.data;

    let data = [];
    const filter = UiService.localGet(Constants.FINANCY_REPORT_FILTER);
    let members: User[];
    let categories: CaixaCategory[];
    let types: CaixaType[];

    const rowCategory: string[][] = [];
    const rowType: string[][] = [];
    if (isModel) {
      const responser = await this.userService.get(filter);
      members = responser.data;
      members.sort((a, b) => (a.church?.name > b.church?.name ? 1 : -1));

      const responser2 = await this.categoryService.get();
      categories = responser2.data;

      const responser3 = await this.caixaTypeService.get();
      types = responser3.data;

      categories.filter((category) => {
        const row = [`${category?.id}`, category?.name, ''];
        rowCategory.push(row);
      });

      types.filter((type) => {
        const row = [`${type?.id}`, type?.name];
        rowType.push(row);
      });
      userExcelFormat.setInfoWorksheet();
    }
    churches.filter(async (church) => {
      if (!isModel) {
        data = this.setFinancyDataSearch(church);
      } else {
        const membersByChurch = members?.filter((member) => {
          if (member?.church?.id === church?.id) {
            return member;
          }
        });

        if (membersByChurch) {
          membersByChurch?.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
        data = this.setFinancyDataModel(
          church,
          membersByChurch,
          rowCategory,
          rowType
        );
      }
      userExcelFormat.setWorksheetGeneral(
        generalTitle,
        church?.name,
        data,
        filter,
        isModel
      );
    });
    this.testDownloadXls(
      userExcelFormat?.workbook,
      generalTitle,
      Constants.FINANCIAL_FOLDER
    );
  }

  public setFinancyDataSearch(church: Church) {
    const inputs: SummaryInput = UiService.localGet(
      Constants.FINANCY_REPORT_INPUT
    );
    const outputs: SummaryOutput = UiService.localGet(
      Constants.FINANCY_REPORT_OUTPUT
    );

    let inputDataChurch: InputsReport;
    inputs.reports.filter((report) => {
      if (report?.church?.id === church?.id) {
        inputDataChurch = report;
      }
    });
    let outputDataChurch: OutputReport;
    outputs.reports.filter((report) => {
      if (report?.church?.id === church?.id) {
        outputDataChurch = report;
      }
    });

    const data = [];
    let count = 0;
    const inputsData: any[] = [];
    const offerData: any[] = [];
    const titheData: any[] = [];
    const outputsData: any[] = [];

    if (inputDataChurch?.total > 0) {
      if (inputDataChurch?.tithe?.titheSummary?.total > 0) {
        inputDataChurch?.tithe?.titheSummary.tithes.filter((obj) =>
          titheData.push([
            UiService.convertToCurrency(obj?.amount),
            obj?.date,
            obj?.user?.name,
            obj?.register?.name,
            '',
          ])
        );
      }

      if (titheData?.length > count) {
        count = titheData?.length;
      }
      if (inputDataChurch?.offer?.titheSummary?.total > 0) {
        inputDataChurch?.offer?.titheSummary.tithes.filter((obj) =>
          offerData.push([
            UiService.convertToCurrency(obj?.amount),
            obj?.date,
            obj?.user?.name,
            obj?.register?.name,
            '',
          ])
        );
      }

      if (offerData?.length > count) {
        count = offerData?.length;
      }
      if (inputDataChurch.caixaReport.caixaReportCategory?.total > 0) {
        inputDataChurch?.caixaReport?.caixaReportCategory?.caixaSummary.filter(
          (summary) =>
            summary?.caixas.filter((obj) =>
              inputsData.push([
                UiService.convertToCurrency(obj?.amount),
                obj?.date,
                obj?.caixaCategory?.name,
                obj?.caixaType?.name ? obj?.caixaType?.name : '',
                obj?.description,
                obj?.register?.name,
                '',
              ])
            )
        );

        if (inputsData?.length > count) {
          count = inputsData?.length;
        }
      }
    }
    if (outputDataChurch.caixaReport.caixaReportCategory?.total > 0) {
      outputDataChurch?.caixaReport?.caixaReportCategory?.caixaSummary.filter(
        (summary) =>
          summary?.caixas.filter((caixa) =>
            outputsData.push([
              UiService.convertToCurrency(caixa?.amount),
              caixa?.date,
              caixa?.caixaCategory?.name,
              caixa?.caixaType?.name ? caixa?.caixaType?.name : '',
              caixa?.description,
              caixa?.register?.name,
              '',
            ])
          )
      );
    }
    if (outputsData?.length > count) {
      count = outputsData?.length;
    }
    for (let i = 0; i < count; i++) {
      let rowTithe = ['', '', '', '', ''];
      let rowOffer = ['', '', '', '', ''];
      let rowInput = ['', '', '', '', '', '', ''];
      let rowOutput = ['', '', '', '', '', '', ''];

      if (i < titheData?.length) {
        rowTithe = titheData[i];
      }
      if (i < offerData?.length) {
        rowOffer = offerData[i];
      }
      if (i < inputsData?.length) {
        rowInput = inputsData[i];
      }
      if (i < outputsData?.length) {
        rowOutput = outputsData[i];
      }

      let completeRow = [];
      completeRow = completeRow.concat(rowTithe);
      completeRow = completeRow.concat(rowOffer);
      completeRow = completeRow.concat(rowInput);
      completeRow = completeRow.concat(rowOutput);

      data.push(completeRow);
    }
    return data;
  }
  public setFinancyDataModel(
    church: Church,
    members: User[],
    rowCategory: string[][],
    rowType: string[][]
  ) {
    const data = [];
    if (members?.length > 0) {
      members.filter((member) => {
        if (member?.church?.id === church?.id) {
          const rowTithe = ['', '', '', '', ''];
          const rowOffer = ['', '', '', '', ''];
          const rowInput = ['', '', '', '', '', ''];
          const rowOutput = ['', '', '', '', '', ''];

          let completeRow = [];
          rowTithe[0] = String(member?.id);
          rowTithe[1] = member?.name;
          rowOffer[0] = String(member?.id);
          rowOffer[1] = member?.name;

          completeRow = completeRow.concat(rowTithe);
          completeRow = completeRow.concat(rowOffer);
          completeRow = completeRow.concat(rowInput);
          completeRow = completeRow.concat(rowOutput);
          data.push(completeRow);
        }
      });

      let cont = 0;
      rowCategory?.filter((obj) => {
        data[cont] = data[cont]?.concat(obj);
        cont++;
      });
      cont = 0;
      rowType?.filter((obj) => {
        if (data[cont]?.length <= 22) {
          data[cont] = data[cont]?.concat(['', '', '']);
        }
        data[cont] = data[cont]?.concat(obj);
        cont++;
      });
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string, op): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);

    /* generate workbook and add the worksheet */
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, excelFileName);
    workbook.SheetNames = [excelFileName];

    /* save to file */
    XLSX.writeFile(workbook, excelFileName + this.EXCEL_EXTENSION);

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
      fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION
    );
  }

  private sendEmail(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    //  FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
    const formDta = new FormData();
    formDta.append('file', data, fileName + this.EXCEL_EXTENSION);
    this.http
      .post<any>(`${environment.API2}/email/send`, formDta, {
        headers: LoginService.getHeaders(true),
      })
      .toPromise()
      .then((resp) => {
        this.exceptionService.openLoading(resp.message);
      });
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
}
