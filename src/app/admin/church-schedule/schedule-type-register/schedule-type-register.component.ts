import { ChurchScheduleTypeService } from 'src/app/services/church-schedule-type.service';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ChurchScheduleType } from 'src/app/models/churchScheduleType';
import { ConstantMessages } from 'src/app/models/messages';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-schedule-type-register',
  templateUrl: './schedule-type-register.component.html',
  styleUrls: ['./schedule-type-register.component.scss'],
})
export class ScheduleTypeRegisterComponent implements OnInit {
  @Input() apiResponse: ChurchScheduleType[];

  churchScheduleType: ChurchScheduleType;
  constructor(
    private exceptionService: ExceptionService,
    private churchScheduleTypeService: ChurchScheduleTypeService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.churchScheduleType = new ChurchScheduleType();
  }

  register() {
    if (!this.objIsAlreadyRegistred()) {
      if (this.validForm()) {
        this.exceptionService.loadingFunction();

        this.churchScheduleTypeService
          .store(this.churchScheduleType)
          .then((responser) => {
            this.churchScheduleType = responser.data;
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
        UiService.stringNormalization(this.churchScheduleType.name)
      )
    );
    if (objects?.length > 0) {
      for (let i = 0; i < objects?.length; i++) {
        this.churchScheduleType = objects[i];
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
    if (!this.churchScheduleType?.name) {
      this.exceptionService.alertDialog(ConstantMessages.GENERIC_NAME_INVALID);
      return;
    }

    return true;
  }

  close() {
    this.popCtrl.dismiss({ obj: this.churchScheduleType });
  }
}
