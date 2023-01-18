import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-maker',
  templateUrl: './comment-maker.component.html',
  styleUrls: ['./comment-maker.component.scss'],
})
export class CommentMakerComponent implements OnInit {
  @Output() retrurnAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() comment: string;
  constructor() {}

  ngOnInit() {}
  setComment() {
    this.retrurnAction.emit({ comment: this.comment });
  }
}
