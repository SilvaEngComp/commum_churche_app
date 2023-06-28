/* eslint-disable no-underscore-dangle */
import { WalletService } from './../../../../services/wallet.service';
import { CaixaCategory } from '../../../../models/caixaCategory';
import { Church } from 'src/app/models/church';
import { ConstantMessages } from 'src/app/models/messages';
import { CaixaType } from '../../../../models/caixaType';
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AlertController, IonInput, Platform } from '@ionic/angular';
import { Caixa } from 'src/app/models/caixa';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { CaixaService } from 'src/app/services/caixa.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';
import { Wallet } from 'src/app/models/wallet';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ModelFileUplod } from 'src/app/models/modelFileUpload';
import { TempFile } from 'src/app/models/temFile';
@Component({
  selector: 'app-caixa-register',
  templateUrl: './caixa-register.component.html',
  styleUrls: ['./caixa-register.component.scss'],
})
export class CaixaRegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('inputAmount', { static: false }) inputAmount: IonInput;
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() caixa: Caixa;
  @Input() isNew: boolean;
  public uploader: FileUploader = new FileUploader({});
  monthYear: string;
  months: CustomizedMonth[];
  isSmallDevice: boolean;
  days: string[] = [];
  day: string;
  caixaTypes: CaixaType[];
  customizedMonth: CustomizedMonth;
  year: string;
  isEntry: string;
  value: string;
  churches: Church[];
  caixaCategorys: CaixaCategory[];
  localPageTitle: string;
  datePipe: DatePipe;
  showDescription: boolean;
  buttonColor: string;
  height: string;
  wallet: Wallet;

  localFiles: ModelFileUplod;
  singleFile: boolean;
  selectedFile: string;
  constructor(
    private caixaService: CaixaService,
    private exceptionService: ExceptionService,
    private platform: Platform,
    private walletService: WalletService,
    private actionCtrl: AlertController
  ) {}

  ngAfterViewInit(): void {
    this.inputAmount.setFocus();
  }

  ngOnInit() {
    this.height = Math.round(this.platform.height() * 0.7) + 'px';
    this.validCaixa();
    if (this.caixa.isEntry) {
      this.localPageTitle = Constants.TITLE_CAIXA_REGISTER_IN;
      this.buttonColor = 'success';
    } else {
      this.buttonColor = 'danger';
      this.localPageTitle = Constants.TITLE_CAIXA_REGISTER_OUT;
    }
    UiService.localSet(Constants.TITLE_CURRENT_PAGE, this.localPageTitle);
    this.isSmallDevice = this.platform.width() <= 500;
    this.datePipe = new DatePipe('en');
    this.caixa.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  validCaixa() {
    this.caixa = UiService.localGet(Constants.CAIXA_MAINTAINCE);
    this.wallet = UiService.localGet(Constants.CAIXA_WALLET);
    this.singleFile = true;
    this.localFiles = new ModelFileUplod();
    if (!this.caixa) {
      this.caixa = new Caixa();
      this.value = '0,0';
      this.caixa.isEntry = UiService.localGet(Constants.IS_ENTRY);
      this.isNew = true;
    } else {
      this.value = UiService.convertToCurrency(this.caixa?.amount);
      this.isNew = false;
    }
  }

  setShowDescription() {
    this.showDescription = !this.showDescription;
  }
  setIsEntry(ev: any) {
    console.clear();
    this.caixa.isEntry = ev.target.value;
  }

  onSetDate(value: any, option: number = 0) {
    if (value) {
      this.caixa.date = value.substring(0, 10);
    } else {
      if (option === 1) {
        this.caixa.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      } else {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        this.caixa.date = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
      }
    }
  }

  async askNeedDoAgain() {
    const action = await this.actionCtrl.create({
      header: 'O que deseja fazer?',
      subHeader: 'Deseja realizar outro registro ?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            window.location.reload();
          },
        },
        {
          text: 'Não',
          handler: () => {
            this.back();
          },
        },
      ],
    });

    await action.present();
  }
  async register(amount: any) {
    this.caixa.amount = UiService.convertToNumber(amount);
    if (this.isFormValid()) {
      if (!this.isNew) {
        this.caixaService.update(this.caixa).then(() => {
          this.fileRegister();
        });
      } else {
        this.caixaService.store(this.caixa).then((responser) => {
          this.caixa = responser.data;

          this.fileRegister();
        });
      }
    }
  }

  fileRegister() {
    const tipo = this.caixa?.isEntry ? 'Entrada' : 'Saída';

    if (this?.localFiles?.files?.length > 0) {
      this.caixaService
        .fileUpload(this.localFiles.formData, this.caixa)
        .then((responser) => {
          this.exceptionService.toastHandler(
            `${tipo} registrada com Successo!`,
            5000
          );
        })
        .catch((error) => {
          this.exceptionService.error(error);
        })
        .finally(() => this.askNeedDoAgain());
    } else {
      this.exceptionService.toastHandler(
        `${tipo} registrada com Successo!`,
        5000
      );
      this.askNeedDoAgain();
    }
  }

  back() {
    UiService.caixaAdminEmitter.emit(UiService.localGet(Constants.BACK_PAGE));
  }
  isFormValid() {
    if (!this.caixa?.caixaCategory?.id) {
      this.exceptionService.alertDialog(
        ConstantMessages.CAIXA_CATEGORY_INVALID
      );
      return;
    }
    if (!this.caixa?.wallet?.id) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_WALLET_INVALID);
      return;
    }

    if (!this.caixa?.church?.id) {
      this.exceptionService.alertDialog(ConstantMessages.CAIXA_CHURCH_INVALID);
      return;
    }

    if (!this.caixa?.amount || this.caixa?.amount <= 0) {
      this.exceptionService.alertDialog(ConstantMessages.AMOUNT_INVALID);
      return;
    }

    const dates = this.caixa.date.split('-');
    if (
      !dates[0] ||
      dates[0]?.length !== 4 ||
      !dates[1] ||
      dates[1]?.length !== 2
    ) {
      this.exceptionService.alertDialog(ConstantMessages.MONTH_YEAR_INVALID);
      return;
    }
    if (!dates[2] || dates[2]?.length > 2) {
      this.exceptionService.alertDialog(ConstantMessages.DAY_INVALID);
      return;
    }

    if (!this.caixa.isEntry && this.caixa?.description?.length <= 0) {
      this.exceptionService.alertDialog(
        ConstantMessages.CAIXA_DESCRIPTION_INVALID
      );
      return;
    }

    return true;
  }

  setType(caixaType: CaixaType) {
    if (caixaType) {
      this.caixa.caixaType = caixaType;
    } else {
      this.caixa.caixaType = null;
    }
  }

  setChurch(church: Church) {
    if (church) {
      this.caixa.church = church;
    } else {
      this.caixa.church = null;
    }
  }
  setCategory(caixaCategory: CaixaCategory) {
    if (caixaCategory) {
      this.caixa.caixaCategory = caixaCategory;
    } else {
      this.caixa.caixaCategory = null;
    }
  }

  setWallet(wallet: Wallet) {
    if (wallet) {
      this.caixa.wallet = wallet;
    } else {
      this.caixa.wallet = null;
    }
  }

  getFiles(): FileLikeObject[] {
    let cont = 0;
    this.localFiles = new ModelFileUplod();

    return this.uploader.queue.map((fileItem, i) => {
      cont++;

      const url = URL.createObjectURL(fileItem._file);

      const image = new TempFile(fileItem._file.name, url, fileItem._file.type);
      this.localFiles.files.push(image);
      if (this.singleFile) {
        this.localFiles.formData.append(
          'files',
          fileItem._file,
          fileItem._file.name
        );
        this.selectedFile = url;
      } else {
        this.localFiles.formData.append(
          'files[]',
          fileItem._file,
          fileItem._file.name
        );
      }

      return fileItem.file;
    });
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  onSelectFile() {
    this.getFiles();
  }

  getLimite() {
    if (this.localFiles.files.length >= 10) {
      this.exceptionService.alertDialog(
        ConstantMessages.FILE_LIMIT,
        'Atenção!'
      );
      return true;
    }

    return false;
  }

  excluir() {
    this.localFiles = new ModelFileUplod();
  }
}
