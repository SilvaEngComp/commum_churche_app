import { ConstantMessages } from './../../models/messages';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { PolicyComponent } from 'src/app/resources/policy/policy.component';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  is_invitting: boolean;
  base_url: string = environment.IMAGE_URL;

  user: User;
  constructor(
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private router: Router,
    private exceptionService: ExceptionService,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.user = LoginService.getToken().user;
  }

  showInvitation() {
    // this.socialSharing.canShareViaEmail().then(() => {
    //   console.log('teeste email').
    // }).catch(() => {
    //   // Sharing via email is not possible
    // });

    // // Share via email
    // this.socialSharing.shareViaEmail('Body', 'Subject', ['silvaengcomp@gmail.com']).then(() => {
    //   // Success!
    // }).catch(() => {
    //   // Error!
    // });
    // Share via email

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
