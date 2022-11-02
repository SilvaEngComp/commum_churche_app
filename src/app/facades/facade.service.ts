import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { ExceptionService } from '../services/exception-service.service';
import { ServiceInterface } from '../services/serviceInterface';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  @Output() dataLoaded: EventEmitter<any> = new EventEmitter<any>();
  localName: string;

  constructor(
    @Inject('ServiceInterface') protected repository: ServiceInterface,
    protected exceptionService: ExceptionService
  ) {}
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

    this.repository
      .get()
      .then((response) => {
        if (UiService.validlocalSet(response, this.localName, lastHash)) {
          this.dataLoaded.emit({ financialReport: response });
        }
      })
      .catch((error) => this.exceptionService.error(error));
  }
}
