/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor() { }

  @Input() info: string;
  @Input() iconName: string;
  @Input() top: string;
  @Input() right: string;
  @Input() link: string;
  @Input() page: string;
  ref: string;
  ngOnInit() {
    this.ref = '/#/' + this.page;
    console.log(this.iconName);
  }


  openLink() {
    window.open(this.link, '_blank');
  }
}
