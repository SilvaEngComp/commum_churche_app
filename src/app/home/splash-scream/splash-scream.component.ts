import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-scream',
  templateUrl: './splash-scream.component.html',
  styleUrls: ['./splash-scream.component.scss'],
})
export class SplashScreamComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.goToHome();
    }, 3000);
  }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['home']);
  }
}
