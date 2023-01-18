import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-color-marker',
  templateUrl: './color-marker.component.html',
  styleUrls: ['./color-marker.component.scss'],
})
export class ColorMarkerComponent implements OnInit {
  @Output() retrurnAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() isDirective: boolean;

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

  constructor() {}

  selectColor(color = Constants.COLOR_TRANSPARENT) {
    this.retrurnAction.emit({ color });
  }

  ngOnInit() {}
}
