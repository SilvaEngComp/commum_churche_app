import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Caixa } from 'src/app/models/caixa';
import { CaixaFilter } from 'src/app/models/caixaFilter';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { CaixaService } from 'src/app/services/cashier.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss'],
})
export class CaixaComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  vendedor: User;
  caixa: Caixa;
  filtter: CaixaFilter;
  saidas: Caixa[];
  isLoading: boolean;
  currentDate: string;
  constructor(
    private alertCtrl: AlertController,
    private exceptionService: ExceptionService,
    private caixaService: CaixaService
  ) {}

  ngOnInit() {
    this.caixa = new Caixa();
    this.caixa.reason = '';
    this.filtter = new CaixaFilter();
    this.filtter.type = 2;
    this.currentDate = UiService.getCurrentDate();

    this.load();
  }

  async onSetData(ev: any) {
    this.filtter.date = ev.target.value.substr(0, 10);
    this.load();
  }

  registrar() {
    this.caixa.date = this.caixa.date.substr(0, 10);
    if (this.caixa.amount <= 0) {
      this.exceptionService.alertDialog(
        'Digite um amount maior que zero',
        'Opa!'
      );
      return;
    }
    if (this.caixa.reason === '') {
      this.exceptionService.alertDialog('Digite um Motivo', 'Opa!');
      return;
    }
    this.exceptionService.loadingFunction();
    this.caixaService.story(this.caixa).then(() => {
      this.exceptionService.openLoading('Saída registrada com sucesso!');
      this.load();
    });
  }

  async load() {
    this.isLoading = true;
    this.saidas = await this.caixaService.get(this.filtter);
    if (!this.saidas) {
      this.saidas = [];
    }
    this.isLoading = false;
  }

  async deletar(caixa: Caixa) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja deletar esse registro de caixa ?',
      mode: 'ios',
      buttons: [
        {
          text: 'CANCELAR',
          handler: () => {},
        },
        {
          text: 'SIM',
          handler: () => {
            this.exceptionService.loadingFunction();
            this.caixaService
              .delete(caixa.id)
              .then(() => {
                this.exceptionService.openLoading('Saída de Caixa Deletada!');
                this.load();
              })
              .catch((error) => this.exceptionService.error(error));
          },
        },
      ],
    });

    await alert.present();

    alert.onDidDismiss().then(() => this.load());
  }

  back() {
    this.sessionPage.emit(Constants.PAGE_FINANCY_CAIXA);
  }
}
