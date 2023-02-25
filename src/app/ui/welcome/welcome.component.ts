import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  msg: string;
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {
    this.msg = 'Gratidão por fazer parte dessa comunidade';
  }

  ok() {
    this.modalCtrl.dismiss();
  }
}
