import { CaixaReport } from '../../../../models/CaixaReportChurch';
import { MenuCaixaSummaryComponent } from './../menu-caixa-summary/menu-caixa-summary.component';
import { DownloadService } from './../../../../services/download.service';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { CaixaFacadeService } from 'src/app/facades/caixa-facade.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Caixa } from 'src/app/models/caixa';
import { UiService } from 'src/app/services/ui.service';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-caixa-summary',
  templateUrl: './caixa-summary.component.html',
  styleUrls: ['./caixa-summary.component.scss'],
})
export class CaixaSummaryComponent implements OnInit {
  @Output() mantainceEmiter: EventEmitter<any> = new EventEmitter<any>();
  @Input() caixaReport: CaixaReport;
  @Input() isEntry: boolean;
  public uploader: FileUploader = new FileUploader({});
  headCaixaList: string[] = [
    'Valor',
    'Data',
    'Tesoureiro',
    'Organização',
    'Subcagoria',
    '',
  ];
  constructor(
    private caixaFacade: CaixaFacadeService,
    private popCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {
    console.log(this.caixaReport);
  }

  async edit(caixa: Caixa) {
    UiService.localSet(Constants.CAIXA_MAINTAINCE, caixa);

    UiService.caixaAdminEmitter.emit(
      Constants.MENU_FINANCY_OPTION_CAIXA_REGISTER
    );
  }
  delete(caixa: Caixa) {
    this.caixaFacade.delete(caixa);
  }

  async openMenuOption(ev: any, caixa: Caixa) {
    const pop = await this.popCtrl.create({
      component: MenuCaixaSummaryComponent,
      event: ev,
    });

    pop.present();

    const { data } = await pop.onWillDismiss();

    if (data?.option === Constants.OPTION_EDIT) {
      this.edit(caixa);
    } else if (data?.option === Constants.OPTION_DELETE) {
      this.delete(caixa);
    }
  }

  download(caixa: Caixa) {
    this.downloadService.downloadPDF(caixa);
  }
  async openDescription(caixa: Caixa) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Descrição',
      subHeader: caixa?.description,

      buttons: [
        {
          text: 'ok',
          data: {
            action: () => {},
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
