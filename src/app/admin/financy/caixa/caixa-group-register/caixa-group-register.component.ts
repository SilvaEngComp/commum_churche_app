import { CaixaCategory } from '../../../../models/caixaCategory';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaCategoryService } from 'src/app/services/caixa-category.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { ConstantMessages } from 'src/app/models/messages';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa-group-register',
  templateUrl: './caixa-group-register.component.html',
  styleUrls: ['./caixa-group-register.component.scss'],
})
export class CaixaCategoryRegisterComponent implements OnInit {
  @Input() apiResponse: CaixaCategory[];
  caixaCategory: CaixaCategory;
  constructor(
    private exceptionService: ExceptionService,
    private caixacategoryService: CaixaCategoryService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.caixaCategory = new CaixaCategory();
  }

  register() {
    if (!this.objIsAlreadyRegistred()) {
      if (this.validForm()) {
        this.exceptionService.loadingFunction();

        this.caixacategoryService
          .store(this.caixaCategory)
          .then((responser) => {
            this.caixaCategory = responser.data;
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

  validForm() {
    if (!this.caixaCategory?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  objIsAlreadyRegistred() {
    const objects = this.apiResponse.filter((obj) =>
      UiService.stringNormalization(obj.name).includes(
        UiService.stringNormalization(this.caixaCategory.name)
      )
    );
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        this.caixaCategory = objects[i];
        this.exceptionService.alertDialog(
          ConstantMessages.USER_ALREADY_EXISTS,
          'Alerta'
        );
        return true;
      }
    }
    return false;
  }

  close() {
    this.popCtrl.dismiss({ obj: this.caixaCategory });
  }
}
