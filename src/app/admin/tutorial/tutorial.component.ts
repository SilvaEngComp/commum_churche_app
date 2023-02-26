import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ConstantsMidia } from 'src/app/models/contantsMidia';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  path: string;
  constructor() {}

  ngOnInit() {
    this.path = UiService.localGet(ConstantsMidia.OPPEN_TUTORIAL);
  }
}
