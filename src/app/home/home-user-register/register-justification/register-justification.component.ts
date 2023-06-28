import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register-justification',
  templateUrl: './register-justification.component.html',
  styleUrls: ['./register-justification.component.scss'],
})
export class RegisterJustificationComponent implements OnInit {
  @Output() session: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
    this.clear();
  }

  setSession(session: number) {
    localStorage.clear();
    this.session.emit(session);
  }

  clear() {
    UiService.localRemove(Constants.CURRENT_REGISTER_SESSION);
    UiService.localRemove(Constants.REGISTRING_USER);
    this.setSession(0);
  }
}
