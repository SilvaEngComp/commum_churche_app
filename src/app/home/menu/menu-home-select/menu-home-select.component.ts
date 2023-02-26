import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-menu-home-select',
  templateUrl: './menu-home-select.component.html',
  styleUrls: ['./menu-home-select.component.scss'],
})
export class MenuHomeSelectComponent implements OnInit {
  isLarge: boolean;
  user: User;
  page: number;
  public installPrompt = null;
  showBtn = false;

  public promptEvent;

  constructor(
    private platform: Platform,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    if (!this.page || this.page < 0) {
      this.page = 2;
    }
    this.isLarge = this.platform.width() > 500;
    window.addEventListener('beforeinstallprompt', (e) => {
      this.installPrompt = e;
    });
  }

  doRefresh(ev) {
    window.location.reload();
  }

  onSelectPage(page: any) {
    if (page <= -1) {
      this.installPWA();
    } else {
      this.page = page;
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.promptEvent = e;
  }

  public installPWA() {
    if (this.promptEvent) {
      this.promptEvent.prompt();
    } else {
      this.exceptionService.alertDialog(
        'O App já se encontra instalado. Caso contrário acesso pelo Google Chrome'
      );
    }
  }

  public shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.promptEvent;
  }

  public isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }
}
