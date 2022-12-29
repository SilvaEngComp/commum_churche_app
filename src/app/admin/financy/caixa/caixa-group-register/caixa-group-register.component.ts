import { CaixaGroup } from './../../../../models/caixaGroup';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CaixaGroupService } from 'src/app/services/caixa-group.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { ConstantMessages } from 'src/app/models/messages';

@Component({
  selector: 'app-caixa-group-register',
  templateUrl: './caixa-group-register.component.html',
  styleUrls: ['./caixa-group-register.component.scss'],
})
export class CaixaGroupRegisterComponent implements OnInit {
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
    if (this.validForm()) {
      this.exceptionService.loadingFunction();

      this.caixagroupService
        .store(this.caixaGroup)
        .then(() => {
          this.close();
        })
        .catch((erro) => {
          this.exceptionService.error(erro);
        });
    }
  }

  validForm() {
    if (!this.caixaGroup?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  close() {
    this.popCtrl.dismiss();
  }
}
