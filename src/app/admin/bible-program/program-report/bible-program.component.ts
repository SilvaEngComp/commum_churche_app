import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BibleReaderProgram } from 'src/app/models/bibleReaderProgram';
import { Constants } from 'src/app/models/constants';
import { BibleProgramService } from 'src/app/services/bible-program.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-bible-program',
  templateUrl: './bible-program.component.html',
  styleUrls: ['./bible-program.component.scss'],
})
export class BibleProgramComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  isLoading: boolean;
  biblePrograms: BibleReaderProgram[];
  constructor(private bibleProgramService: BibleProgramService) {}

  ngOnInit() {
    this.isLoading = true;
    UiService.localRemove(Constants.SELECTED_BIBLE_PROGRAM_MAP);
    this.load();
  }

  async load() {
    this.bibleProgramService
      .get()
      .then((responser) => {
        this.biblePrograms = responser.data;
        console.log(this.biblePrograms);
      })
      .finally(() => (this.isLoading = false));
  }

  openProgram(program: BibleReaderProgram) {
    UiService.localSet(Constants.SELECTED_BIBLE_PROGRAM_MAP, program);
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_MAP);
  }

  openReaders() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_READERS);
  }

  back() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_READ_DAY);
  }

  doRefresh(ev) {
    window.location.reload();
  }
}
