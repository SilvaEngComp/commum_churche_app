/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
})
export class AlterarSenhaComponent implements OnInit {


  @Input() user: User;
  constructor(
    private loginService: LoginService,
    private modalCtrl: ModalController,
  ) { }
  typePassword1: string;
  typePassword2: string;
  show1: boolean;
  show2: boolean;
  editing: boolean;
  senha: string;
  senha2: string;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  btnDisable: boolean;
  diferentes: boolean;

  ngOnInit() {
    this.diferentes = false;
    this.btnDisable = true;
    this.check1 = false;
    this.check2 = false;
    this.check3 = false;
    this.check4 = false;
    this.check5 = false;
    this.editing = false;
    this.show1 = false;
    this.show2 = false;
    this.senha = '';
    this.senha2 = '';
    this.typePassword1 = 'password';
    this.typePassword2 = 'password';
  }

  setEditing() {
    this.editing = !this.editing;
  }


  checkRoles(nova) {
    this.senha = nova;
    console.log(this.senha);
    let teste = RegExp('[A-Z]');
    let flat = 0;

    if (teste.test(this.senha)) {
      this.check1 = true;
      flat++;
    } else {
      this.check1 = false;
      flat--;
    }

    teste = RegExp('[a-z]');
    if (teste.test(this.senha)) {
      this.check2 = true;
      flat++;
    } else {
      this.check2 = false;
      flat--;
    }
    teste = RegExp('[0-9]');
    if (teste.test(this.senha)) {
      this.check3 = true;
      flat++;
    } else {
      this.check3 = false;
      flat--;
    }
    teste = RegExp('[\./\@/\-/\_]');
    if (teste.test(this.senha)) {
      this.check4 = true;
      flat++;
    } else {
      this.check4 = false;
      flat--;
    }
    if (this.senha.length >= 8) {
      this.check5 = true;
      flat++;
    } else {
      this.check5 = false;
      flat--;
    }

    if (flat >= 5) {
      this.btnDisable = false;
    } else {
      this.btnDisable = true;
    }
  }

  alterarSenha() {
    if (this.senha.length > 0 && this.senha2.length > 0) {
      if (this.senha2 !== this.senha) {
        this.diferentes = true;
        return;
      } else {
        this.diferentes = false;
        this.loginService.alterarSenha(this.user, this.senha).then(
          () => {
            this.modalCtrl.dismiss({
              status: true
            });
          });
      }
    }
  }


  back() {
    this.modalCtrl.dismiss();
  }

  showPassword(op: number) {
    if (1) {
      this.show1 = !this.show1;
      if (this.show1) {
        this.typePassword1 = 'text';
      } else {
        this.typePassword1 = 'password';
      }
    } else {
      this.show2 = !this.show2;
      if (this.show2) {
        this.typePassword2 = 'text';
      } else {
        this.typePassword2 = 'password';
      }
    }
  }
}
