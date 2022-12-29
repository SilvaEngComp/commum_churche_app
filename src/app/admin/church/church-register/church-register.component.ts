import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Church } from 'src/app/models/church';
import { ConstantMessages } from 'src/app/models/messages';
import { ChurchService } from 'src/app/services/church.service';
import { ExceptionService } from 'src/app/services/exception-service.service';

@Component({
  selector: 'app-church-register',
  templateUrl: './church-register.component.html',
  styleUrls: ['./church-register.component.scss'],
})
export class ChurchRegisterComponent implements OnInit {
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
    if (this.validForm()) {
      this.exceptionService.loadingFunction();

      this.churchService
        .store(this.church)
        .then(() => {
          this.close();
        })
        .catch((erro) => {
          this.exceptionService.error(erro);
        });
    }
  }

  validForm() {
    if (!this.church?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  close() {
    this.popCtrl.dismiss();
  }
}
