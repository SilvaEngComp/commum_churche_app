import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { UserVerseMark } from 'src/app/models/userVerseMark';
import { Verse } from 'src/app/models/verse';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { UserVerseMarkService } from 'src/app/services/user-verse-mark.service';

@Component({
  selector: 'app-color-marker',
  templateUrl: './color-marker.component.html',
  styleUrls: ['./color-marker.component.scss'],
})
export class ColorMarkerComponent implements OnInit {
  @Output() retrurnAction: EventEmitter<any> = new EventEmitter<any>();

  colors = [
    'blue',
    'blueviolet',
    'burlywood',
    'CadetBlue',
    'Chartreuse',
    'chocolate',
    'coral',
    'índigo',
    'carmesim',
    'ciano',
    'DarkBlue',
    'DimGray',
    'DodgerBlue',
    'FireBrick',
    'Maroon',
    'ForestGreen',
  ];

  constructor(private userVerseMarkService: UserVerseMarkService) {}

  ngOnInit() {}

  prepareVerses() {}

  selectColor(color = Constants.COLOR_TRANSPARENT) {
    const selectedVerses: Verse[] = UiService.localGet(
      Constants.SELECTED_VERSES_PRESSED
    );
    const userVerseMarks: UserVerseMark[] = [];
    const user = LoginService.getUser();
    selectedVerses.filter((verse) => {
      if (!verse?.userVerseMark) {
        verse.userVerseMark = new UserVerseMark();
      }
      verse.userVerseMark.user_id = user.id;
      verse.userVerseMark.verse_id = verse.id;
      verse.userVerseMark.color = color;
      userVerseMarks.push(verse.userVerseMark);
    });

    this.userVerseMarkService.store(userVerseMarks);

    this.back(selectedVerses);
  }

  back(selectedVerses: Verse[]) {
    UiService.returnColorMaker.emit({
      selectedVerses,
    });
  }
}
