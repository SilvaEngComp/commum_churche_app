import { BibleProgramMap } from './../../../models/bibleProgramMap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BibleReaderProgram } from 'src/app/models/bibleReaderProgram';
import { BibleProgramService } from 'src/app/services/bible-program.service';
import { UiService } from 'src/app/services/ui.service';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-bible-program-map',
  templateUrl: './bible-program-map.component.html',
  styleUrls: ['./bible-program-map.component.scss'],
})
export class BibleProgramMapComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  selectedProgram: BibleReaderProgram;
  isLoading: boolean;
  bibleProgram: BibleProgramMap[];
  constructor(private bibleProgramService: BibleProgramService) {}

  ngOnInit() {
    this.selectedProgram = UiService.localGet(
      Constants.SELECTED_BIBLE_PROGRAM_MAP
    );
    if (!this.selectedProgram) {
      this.back();
    }
    this.load();
  }

  async load() {
    this.isLoading = true;
    const responser = await this.bibleProgramService.show(this.selectedProgram);
    const programList: BibleReaderProgram = responser.data;
    this.bibleProgram = programList.program;
    this.isLoading = false;
  }

  back() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_PLAN);
  }
}
