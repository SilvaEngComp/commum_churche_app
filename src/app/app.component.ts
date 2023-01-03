import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public installPrompt = null;
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        console.log('we are here!');
        if (confirm('Uma nova versão está disponível. Deseja atualizar?')) {
          window.location.reload();
        }
      });
    }
  }

  getInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e;
    });
  }

  askUserToIntallApp() {
    this.installPrompt.prompt();
  }
}
