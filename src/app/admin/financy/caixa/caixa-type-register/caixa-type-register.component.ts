import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaType } from 'src/app/models/caixaType';
import { ConstantMessages } from 'src/app/models/messages';
import { CaixaTypeService } from 'src/app/services/caixa-type.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa-type-register',
  templateUrl: './caixa-type-register.component.html',
  styleUrls: ['./caixa-type-register.component.scss'],
})
export class CaixaTypeRegisterComponent implements OnInit {
  @Input() apiResponse: CaixaType[];

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
    if (!this.objIsAlreadyRegistred()) {
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
    } else {
      this.close();
    }
  }
  objIsAlreadyRegistred() {
    const objects = this.apiResponse.filter((obj) =>
      UiService.stringNormalization(obj.name).includes(
        UiService.stringNormalization(this.caixaType.name)
      )
    );
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        this.caixaType = objects[i];
        this.exceptionService.alertDialog(
          ConstantMessages.USER_ALREADY_EXISTS,
          'Alerta'
        );
        return true;
      }
    }
    return false;
  }

  validForm() {
    if (!this.caixaType?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  close() {
    this.popCtrl.dismiss({ obj: this.caixaType });
  }
}
