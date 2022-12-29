import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaType } from 'src/app/models/caixaType';
import { ConstantMessages } from 'src/app/models/messages';
import { CaixaTypeService } from 'src/app/services/caixa-type.service';
import { ExceptionService } from 'src/app/services/exception-service.service';

@Component({
  selector: 'app-caixa-type-register',
  templateUrl: './caixa-type-register.component.html',
  styleUrls: ['./caixa-type-register.component.scss'],
})
export class CaixaTypeRegisterComponent implements OnInit {
  caixaType: CaixaType;
  constructor(
    private exceptionService: ExceptionService,
    private caixatypeService: CaixaTypeService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.caixaType = new CaixaType();
  }

  register() {
    if (this.validForm()) {
      this.exceptionService.loadingFunction();

      this.caixatypeService
        .store(this.caixaType)
        .then(() => {
          this.close();
        })
        .catch((erro) => {
          this.exceptionService.error(erro);
        });
    }
  }

  validForm() {
    if (!this.caixaType?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  close() {
    this.popCtrl.dismiss();
  }
}
