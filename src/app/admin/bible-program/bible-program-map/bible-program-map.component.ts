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
    console.log(this.selectedProgram);
    if (!this.selectedProgram) {
      this.back();
    }
    this.load();
  }

  async load() {
    const responser = await this.bibleProgramService.show(this.selectedProgram);
    const programList: BibleReaderProgram = responser.data;
    this.bibleProgram = programList.program;
  }

  back() {
    this.sessionPage.emit('0');
  }
}
