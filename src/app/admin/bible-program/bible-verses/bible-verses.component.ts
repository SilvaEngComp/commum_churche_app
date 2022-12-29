import { Platform } from '@ionic/angular';
import { BibleProgramService } from './../../../services/bible-program.service';
import { VerseDay } from './../../../models/verseDay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-bible-verses',
  templateUrl: './bible-verses.component.html',
  styleUrls: ['./bible-verses.component.scss'],
})
export class BibleVersesComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  verseDay: VerseDay;
  text: string;
  height: string;
  constructor(
    private bibleProgramService: BibleProgramService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.verseDay = UiService.localGet(Constants.SELECTED_VERSE_DAY);
    this.height = Math.round(this.platform.height() * 0.8) + 'px';
    this.load();
  }

  back() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_READ_DAY);
  }
  async load() {
    this.bibleProgramService.getVerse(this.verseDay).then((responser) => {
      this.text = responser.data;
      console.log(responser);
    });
  }
}
