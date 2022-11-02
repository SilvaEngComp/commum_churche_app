/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, PopoverController, ModalController } from '@ionic/angular';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() users: User[];
  @Input() role: string;
  page: string;
  permission: number;
  sellers: User[];
  limit: number;
  base_url: string = environment.IMAGE_URL;
  isSearching: boolean;
  isSellerShowed: boolean;
  isFilterShowed: boolean;
  funcIsLoading: boolean;
  label: string;
  inferiorLimit: number;
  upperLimit: number;
  paginationNumber: number;
  tresholderPagination: number;
  @ViewChild('searchUser', { static: false }) inputSearch: IonInput;

  constructor(
    private popCtrl: PopoverController,
    private userFacadeService: UserFacadeService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    if (this.role === 'seller') {
      this.label = 'Vendedores';
    } else {
      this.label = 'Clientes';
    }

    this.tresholderPagination = 10;
    this.inferiorLimit = UiService.localGet('inferiorUserLimit');
    this.upperLimit = UiService.localGet('upperUserLimit');

    if (!this.inferiorLimit) {
      this.inferiorLimit = 0;
    }
    if (!this.upperLimit) {
      this.upperLimit = this.tresholderPagination;
    }

    this.paginationNumber = this.upperLimit / this.tresholderPagination;

    this.userFacadeService.dataLoaded.subscribe((data) => {
      this.users = data;
      UiService.localSet('upperUserLimit', 10);
      UiService.localSet('inferiorUserLimit', 0);
    });
  }

  loadUsers() {
    this.userFacadeService.load(this.role);
  }

  setShowFilterCustomer() {
    this.isFilterShowed = !this.isFilterShowed;
    UiService.localSet('isFilterShowed', this.isFilterShowed);
  }

  backPage() {
    if (this.upperLimit > this.tresholderPagination) {
      this.inferiorLimit -= this.tresholderPagination;
      this.upperLimit -= this.tresholderPagination;
      this.paginationNumber--;
      this.limitsSave();
    }
  }

  nextPage() {
    if (this.upperLimit <= this.users.length) {
      this.inferiorLimit += this.tresholderPagination;
      this.upperLimit += this.tresholderPagination;
      this.paginationNumber++;
      this.limitsSave();
    }
  }

  limitsSave() {
    UiService.localSet('upperUserLimit', this.upperLimit);
    UiService.localSet('inferiorUserLimit', this.inferiorLimit);
  }

  search(search: any) {
    this.users = null;
    this.users = this.userFacadeService.searchUser(search);
  }

  async newUser() {
    this.exceptionService.loadingFunction();
    const modal = await this.modalCtrl.create({
      component: UserRegisterComponent,
      componentProps: {
        permission: this.permission,
        op: 'user-new',
        role: this.role,
        user: new User(),
      },
      backdropDismiss: false,
    });
    await modal.present();

    await modal.onDidDismiss().then(() => this.loadUsers());
  }

  async edit(user: User) {
    const modal = await this.modalCtrl.create({
      component: UserRegisterComponent,
      componentProps: { user, permission: this.permission, op: 'user-alter' },
    });

    await modal.present();

    await modal.onDidDismiss().then(() => this.loadUsers());
  }

  delete(user: User) {
    this.userFacadeService.delete(user);
  }
}
