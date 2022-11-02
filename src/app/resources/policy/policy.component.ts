/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { LoginService } from 'src/app/services/login.service';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UserPolicyService } from 'src/app/services/user-policy.service';
import { PolicyObj } from 'src/app/models/policy';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  constructor(
    private userPolicyService: UserPolicyService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private exceptionService: ExceptionService,
    private loginService: LoginService,
    public http: HttpClient
  ) {}

  text: string;
  textAux: string[];
  height: number;
  synth: any;
  voices: string[] = [];
  selectedVoice: any;
  speakText: any;
  isSpeaking: boolean;
  startIn: number;
  policy: PolicyObj;

  ngOnInit() {
    console.log(this.policy);
    this.synth = window.speechSynthesis;
    this.show = true;
    this.height = 2.5 * this.platform.height();
    this.startIn = 20;
    this.setText();
  }

  show: boolean;
  @Input() user: User;

  back() {
    this.modalCtrl.dismiss();
  }

  selecting(checked: boolean) {
    this.show = !checked;
  }
  async assinar(sign: boolean) {
    console.log(sign);
    const token = LoginService.getToken();
    this.pause();
    if (sign) {
      token.user.policy = true;
      this.userPolicyService
        .updatePolicy(token.user)
        .then(() => {
          this.exceptionService.openLoading('Politica de privacidade Aceita!');

          LoginService.setToken(token);
          this.modalCtrl.dismiss();
        })
        .catch((e) => this.exceptionService.error(e));
    } else {
      token.user.policy = false;
      this.userPolicyService.updatePolicy(token.user);

      const alert = await this.alertCtrl.create({
        header: 'Política não aceita',
        message:
          'Você recusou nossa política de privacidade e será redirecionado' +
          'à página inicial, mas se mudar de opnião pode acessar novamente' +
          'e aceitar.Tenha um exelente dia!',
        buttons: [
          {
            text: 'CANCELAR',
            handler: () => {},
          },
          {
            text: 'CONTINUAR',
            handler: () => {
              this.modalCtrl.dismiss();
              this.loginService.logout();
            },
          },
        ],
      });

      alert.present();
    }
  }

  // async voicesOptions(ev) {
  //   const pop = await this.popCtrl.create({
  //     component: ReaderOptionsComponent,
  //     event: ev,
  //   });

  //   pop.present();

  //   const { data } = await pop.onDidDismiss();
  //   if (data) {
  //     this.selectedVoice = data.voice;
  //     const lang = this.selectedVoice.lang;
  //     // localStorage.setItem("lang", lang);
  //     window.location.reload();
  //   }
  // }

  readPolicy() {
    if (this.synth.speaking) {
      this.isSpeaking = true;
      console.error('Already speaking...');
      return;
    }
    if (this.text !== '') {
      //selected voice

      this.speakText = new SpeechSynthesisUtterance(this.text);
      this.speakText.voice = this.selectedVoice;
      this.speakText.onend = (e) => {
        if (this.isSpeaking) {
          if (this.startIn <= this.textAux.length) {
            this.text = this.concatText(this.startIn + 1, this.startIn + 20);
            this.startIn = Number(this.startIn + 20);
            this.readPolicy();
          }
        }
      };

      this.speakText.onstart = (e) => {
        this.isSpeaking = true;
      };
      this.speakText.onerror = (e) => {
        console.log('error' + e);
      };
      this.synth.speak(this.speakText);

      this.isSpeaking = true;
    }
  }

  pause() {
    this.synth = window.speechSynthesis;
    this.isSpeaking = false;
    this.speakText = new SpeechSynthesisUtterance('');
    this.synth.speak(this.speakText);
    // this.synth.pause();
  }
  concatText(init, finish) {
    let str = '';
    for (let i = init; i <= finish; i++) {
      str += ' ' + this.textAux[i];
    }

    return str;
  }

  async setText() {
    // this.textAux = policy.policy;
    // console.log(this.textAux);
    // this.text = this.concatText(0, 20);
    // const lang = localStorage.getItem("lang") || "en";
    // console.log(lang);
    // const headers = new HttpHeaders({
    //   "Accept-Language": lang,
    // });
    // console.log(headers);
    // this.http
    //   .get(`${environment.API}/users/policy`, { headers: headers })
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
  }
}
