/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { PolicyComponent } from 'src/app/resources/policy/policy.component';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  is_invitting: boolean;
  base_url: string = environment.IMAGE_URL;

  user: User;
  constructor(
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private router: Router,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.user = LoginService.getToken().user;
  }

  showInvitation() {
    this.is_invitting = !this.is_invitting;
  }

  sendInvitation(email) {
    if (UiService.validEmail(email)) {
      this.loginService
        .sendInvitation(email)
        .then((responser) => {
          this.exceptionService.success(responser);
        })
        .catch((err) => this.exceptionService.error(err));
    } else {
      this.exceptionService.alertDialog('Digite um email válido', 'Opa!');
    }
  }

  async selectOption(page: string) {
    if (page === 'sair') {
      this.logout();
    } else if (page === 'policy') {
      const modal = await this.modalCtrl.create({
        component: PolicyComponent,
      });
      await modal.present();
    } else {
      this.router.navigate(['admin/' + page]);
    }
  }

  logout() {
    this.loginService.logout();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
