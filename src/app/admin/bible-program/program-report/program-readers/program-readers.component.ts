import { Platform } from '@ionic/angular';
import { BibleProgramService } from 'src/app/services/bible-program.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Reader } from 'src/app/models/reader';
import { BibleProgramUserService } from 'src/app/services/bible-program-user.service';
import { Constants } from 'src/app/models/constants';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-program-readers',
  templateUrl: './program-readers.component.html',
  styleUrls: ['./program-readers.component.scss'],
})
export class ProgramReadersComponent implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  height: string;
  readers: Reader[];
  header = ['Nome', 'Onde congrega', 'Onde está'];
  constructor(
    private bibleProgramUserService: BibleProgramUserService,
    private platflorm: Platform
  ) {}

  ngOnInit() {
    this.height = this.platflorm.height() * 0.8 + 'px';
    this.load();
  }

  load() {
    this.bibleProgramUserService.getReaders().then((responser) => {
      this.readers = responser.data;
      this.readers.filter((reader) => {
        reader.verseDay.customizedMonth = new CustomizedMonth(
          reader.verseDay?.month
        );
        reader.user = this.checkImage(reader.user);
      });

      console.log(this.readers);
    });
  }

  back() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_PLAN);
  }

  checkImage(user: User) {
    if (!user?.image) {
      if (user?.gender.toLocaleLowerCase().includes('masculino')) {
        user.image = Constants.MALE_PERSON;
      } else {
        user.image = Constants.FEMALE_PERSON;
      }
    }
    return user;
  }
}
