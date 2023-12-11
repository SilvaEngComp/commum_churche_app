/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { PolicyComponent } from 'src/app/resources/policy/policy.component';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Constants } from 'src/app/models/constants';
import { Contact } from 'src/app/models/contact';
import { Share } from '@capacitor/share';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  is_invitting: boolean;
  is_localImage: boolean;
  user: User;
  localImage: string;
  height: string;

  constructor(
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_ADMIN_PAGE
    );
    UiService.pageTitle.emit(Constants.TITLE_ADMIN_PAGE);

    this.height = this.platform.height() * 0.9 + 'px';
    this.validUser();
  }
  validUser() {
    this.user = LoginService.getToken().user;

    this.checkImageExists();
    if (!this.user.contact) {
      this.user.contact = new Contact();
    }

    if (
      !this.user?.image ||
      this.user?.image === Constants.MALE_PERSON ||
      this.user?.image === Constants.FEMALE_PERSON
    ) {
      this.user.image = this.localImage;
    }
  }

  checkImageExists() {
    if (this.user?.gender?.toLocaleLowerCase().includes('masculino')) {
      this.localImage = Constants.MALE_PERSON;
    } else {
      this.localImage = Constants.FEMALE_PERSON;
    }
  }

  async share() {
    await Share.share({
      title: 'App Igreja Batista Nova Betel',
      text: `Venha conhecer nosso APP...
"Discipulado, um estilo de vida!"`,
      url: environment.BASE_URL,
      dialogTitle: 'Igreja Batista Nova Betel',
    });
  }

  async selectOption(page: number) {
    if (page === 100) {
      const modal = await this.modalCtrl.create({
        component: PolicyComponent,
      });
      await modal.present();
    } else {
      this.returnPage.emit(page);
    }
  }

  logout() {
    this.loginService.logout();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
