/* eslint-disable @typescript-eslint/member-ordering */
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reader-options',
  templateUrl: './reader-options.component.html',
  styleUrls: ['./reader-options.component.scss'],
})
export class ReaderOptionsComponent implements OnInit {
  constructor(private popCtrl: PopoverController) { }

  synth: any;
  voices: string[] = [];
  apiVoices: any[] = [];

  ngOnInit() {
    this.getVoices();
  }

  onSelectCVoice(i) {
    console.log(i);
    this.popCtrl.dismiss({
      voice: this.apiVoices[i],
    });
  }
  getVoices = () => {
    this.synth = window.speechSynthesis;

    this.apiVoices = this.synth.getVoices();
    this.apiVoices.filter((v) => {
      this.voices.push(`${v.name} (${v.lang})`);
    });
  };
}
