import { CaixaGroup } from './../../../../models/caixaGroup';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaGroupService } from 'src/app/services/caixa-group.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { ConstantMessages } from 'src/app/models/messages';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-caixa-group-register',
  templateUrl: './caixa-group-register.component.html',
  styleUrls: ['./caixa-group-register.component.scss'],
})
export class CaixaGroupRegisterComponent implements OnInit {
  @Input() apiResponse: CaixaGroup[];
  caixaGroup: CaixaGroup;
  constructor(
    private exceptionService: ExceptionService,
    private caixagroupService: CaixaGroupService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.caixaGroup = new CaixaGroup();
  }

  register() {
    if (!this.objIsAlreadyRegistred()) {
      if (this.validForm()) {
        this.exceptionService.loadingFunction();

        this.caixagroupService
          .store(this.caixaGroup)
          .then((responser) => {
            this.caixaGroup = responser.data;
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
    if (!this.caixaGroup?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  objIsAlreadyRegistred() {
    const objects = this.apiResponse.filter((obj) =>
      UiService.stringNormalization(obj.name).includes(
        UiService.stringNormalization(this.caixaGroup.name)
      )
    );
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        this.caixaGroup = objects[i];
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
    this.popCtrl.dismiss({ obj: this.caixaGroup });
  }
}
