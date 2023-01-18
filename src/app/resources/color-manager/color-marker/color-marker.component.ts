import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() verse: Verse;

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
    'Yellow',
  ];

  constructor(private userVerseMarkService: UserVerseMarkService) {}

  ngOnInit() {
    console.log(this.verse);
    if (this.verse) {
      if (!this.verse?.userVerseMark) {
        this.verse.userVerseMark = new UserVerseMark();
      }

      const user = LoginService.getUser();
      this.verse.userVerseMark.user_id = user.id;
      this.verse.userVerseMark.verse_id = this.verse.id;
    }
  }

  selectColor(color = Constants.COLOR_TRANSPARENT) {
    this.verse.userVerseMark.color = color;
    this.userVerseMarkService.store(this.verse.userVerseMark);
    this.back();
  }

  back() {
    UiService.returnColorMaker.emit({
      verse: this.verse,
    });
  }
}
