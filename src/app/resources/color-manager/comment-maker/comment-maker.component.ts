import { PopoverController } from '@ionic/angular';
import { Verse } from 'src/app/models/verse';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserVerseMarkService } from 'src/app/services/user-verse-mark.service';
import { LoginService } from 'src/app/services/login.service';
import { UserVerseMark } from 'src/app/models/userVerseMark';

@Component({
  selector: 'app-comment-maker',
  templateUrl: './comment-maker.component.html',
  styleUrls: ['./comment-maker.component.scss'],
})
export class CommentMakerComponent implements OnInit {
  @Input() verse: Verse;
  comment: string;

  constructor(
    private userVerseMarkService: UserVerseMarkService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    console.log(this.verse);
    if (this.verse) {
      if (!this.verse?.userVerseMark) {
        this.verse.userVerseMark = new UserVerseMark();
      }
      this.comment = this.verse.userVerseMark?.comment;

      const user = LoginService.getUser();
      this.verse.userVerseMark.user_id = user.id;
      this.verse.userVerseMark.verse_id = this.verse.id;
    }
  }
  setComment() {
    this.verse.userVerseMark.comment = this.comment;

    this.userVerseMarkService.store([this.verse.userVerseMark]);
    this.back();
  }

  delete() {
    this.verse.userVerseMark.comment = null;
    this.userVerseMarkService.destroy(this.verse.userVerseMark);
    this.back();
  }

  back() {
    this.popCtrl.dismiss({ verse: this.verse });
  }

  close() {
    this.popCtrl.dismiss();
  }
}
