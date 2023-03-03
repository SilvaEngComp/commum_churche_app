import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaCategory } from 'src/app/models/caixaCategory';
import { Church } from 'src/app/models/church';
import { ConstantMessages } from 'src/app/models/messages';
import { ChurchService } from 'src/app/services/church.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-church-register',
  templateUrl: './church-register.component.html',
  styleUrls: ['./church-register.component.scss'],
})
export class ChurchRegisterComponent implements OnInit {
  @Input() apiResponse: Church[];

  church: Church;
  constructor(
    private exceptionService: ExceptionService,
    private churchService: ChurchService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.church = new Church();
  }

  register() {
    if (!this.objIsAlreadyRegistred()) {
      if (this.validForm()) {
        this.exceptionService.loadingFunction();

        this.churchService
          .store(this.church)
          .then((responser) => {
            this.church = responser.data;
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
    if (!this.church?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  objIsAlreadyRegistred() {
    const objects = this.apiResponse.filter((obj) =>
      UiService.stringNormalization(obj.name).includes(
        UiService.stringNormalization(this.church.name)
      )
    );
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        this.church = objects[i];
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
    this.popCtrl.dismiss({ obj: this.church });
  }
}
