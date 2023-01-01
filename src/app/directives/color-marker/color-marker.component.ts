import { Verse } from 'src/app/models/verse';
import { ModalController, PopoverController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-marker',
  templateUrl: './color-marker.component.html',
  styleUrls: ['./color-marker.component.scss'],
})
export class ColorMarkerComponent implements OnInit {
  @Input() isDirective: boolean;
  @Input() comment: string;
  colors = [
    'CornflowerBlue',
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

  constructor(private modalCtrl: PopoverController) {}

  selectColor(color) {
    this.modalCtrl.dismiss({ color });
  }
  setComment() {
    this.modalCtrl.dismiss({ comment: this.comment });
  }

  ngOnInit() {}
}
