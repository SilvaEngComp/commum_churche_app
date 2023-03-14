import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-scream',
  templateUrl: './splash-scream.component.html',
  styleUrls: ['./splash-scream.component.scss'],
})
export class SplashScreamComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 3000);
  }
}
