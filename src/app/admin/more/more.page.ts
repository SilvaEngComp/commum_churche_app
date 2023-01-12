import { ConstantMessages } from './../../models/messages';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { PolicyComponent } from 'src/app/resources/policy/policy.component';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Constants } from 'src/app/models/constants';
import { Contact } from 'src/app/models/contact';
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
    private exceptionService: ExceptionService,
    private socialSharing: SocialSharing,
    private platform: Platform
  ) {}

  ngOnInit() {
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

  showInvitation() {
    this.socialSharing
      .share(
        'whatsapp',
        'test',
        'https://lh3.googleusercontent.com/p/AF1QipM1TbA_RYN4_t4cANu9LUXTw-B5FG5onkqlF4wV=s1600-w400',
        'https://www.ambienteteste.ibnovabetel.enginydigitaleco.com/#/admin'
      )
      .then(() => {
        console.log('success whatsapp');
      })
      .catch((error) => {
        console.log('error' + error);
      });

    // this.socialSharing
    //   .shareViaWhatsApp(
    //     ConstantMessages.WHATSAPP_INVITE_SHARE,
    //     'https://lh3.googleusercontent.com/p/AF1QipM1TbA_RYN4_t4cANu9LUXTw-B5FG5onkqlF4wV=s1600-w400',
    //     'https://www.ambienteteste.ibnovabetel.enginydigitaleco.com/#/admin'
    //   )
    //   .then(() => {
    //     console.log('menssage sended');
    //   })
    //   .catch(() => {
    //     console.log('menssage did not send');
    //   });
    // this.is_invitting = !this.is_invitting;
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
