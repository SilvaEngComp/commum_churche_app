import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaSubcategory } from 'src/app/models/caixaSubcategory';
import { ConstantMessages } from 'src/app/models/messages';
import { CaixaSubcategoryService } from 'src/app/services/caixa-subcategory.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa-type-register',
  templateUrl: './caixa-type-register.component.html',
  styleUrls: ['./caixa-type-register.component.scss'],
})
export class CaixaSubcategoryRegisterComponent implements OnInit {
  @Input() apiResponse: CaixaSubcategory[];

  caixaSubcategory: CaixaSubcategory;
  constructor(
    private exceptionService: ExceptionService,
    private caixaSubcategoryService: CaixaSubcategoryService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.caixaSubcategory = new CaixaSubcategory();
  }

  register() {
    if (!this.objIsAlreadyRegistred()) {
      if (this.validForm()) {
        this.exceptionService.loadingFunction();

        this.caixaSubcategoryService
          .store(this.caixaSubcategory)
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
        UiService.stringNormalization(this.caixaSubcategory.name)
      )
    );
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        this.caixaSubcategory = objects[i];
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
    if (!this.caixaSubcategory?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  close() {
    this.popCtrl.dismiss({ obj: this.caixaSubcategory });
  }
}
