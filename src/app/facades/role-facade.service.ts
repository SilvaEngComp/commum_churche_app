import { ExceptionService } from './../services/exception-service.service';
import { RoleService } from './../services/role.service';
import { FacadeService } from './facade.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class RoleFacadeService extends FacadeService {
  @Output() dataLoaded = new EventEmitter<string[]>();
  localName: string;

  constructor(
    protected roleService: RoleService,
    protected exceptionService: ExceptionService
  ) {
    super(roleService, exceptionService);
    this.localName = 'localRoles';
  }

  load() {
    this.geRepository();
  }

  getLocal() {
    const response = UiService.localGet();
    if (response) {
      this.dataLoaded.emit(response);
      return UiService.getHash(response);
    }
    return '';
  }

  geRepository() {
    const lastHash = this.getLocal();

    this.roleService
      .get()
      .then((response) => {
        if (UiService.validlocalSet(response, this.localName, lastHash)) {
          this.dataLoaded.emit(response);
        }
      })
      .catch((error) => this.exceptionService.error(error));
  }
}
