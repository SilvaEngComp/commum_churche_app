/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { ExceptionService } from '../../services/exception-service.service';
import { ModalController, IonInput } from '@ionic/angular';
import { UserRegisterComponent } from './user-register/user-register.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { UiService } from 'src/app/services/ui.service';
import { UserFacadeService } from 'src/app/facades/user-facade.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @Input() role: string;
  page: string;
  permission: number;
  users: User[];
  limit: number;
  base_url: string = environment.IMAGE_URL;
  isSearching: boolean;
  isSellerShowed: boolean;
  isFilterCustomerShowed: boolean;
  isLoading: boolean;

  @ViewChild('searchUser', { static: false }) inputSearch: IonInput;

  constructor(
    private userFacadeService: UserFacadeService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.loadUsers();

    this.userFacadeService.dataLoaded.subscribe((data) => {
      this.isLoading = false;
      this.users = data;
      UiService.localSet('upperUserLimit', 10);
      UiService.localSet('inferiorUserLimit', 0);
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.userFacadeService.load(this.role);
  }

  setShowFilterseller() {
    this.isSellerShowed = !this.isSellerShowed;
    UiService.localSet('isSellerShowed', this.isSellerShowed);
  }

  setShowFilterCustomer() {
    this.isFilterCustomerShowed = !this.isFilterCustomerShowed;
    UiService.localSet('isFilterCustomerShowed', this.isFilterCustomerShowed);
  }

  async newUser() {
    this.exceptionService.loadingFunction();
    const modal = await this.modalCtrl.create({
      component: UserRegisterComponent,
      componentProps: {
        permission: this.permission,
        op: 'user-new',
        user: new User(),
      },
      backdropDismiss: false,
    });
    await modal.present();

    await modal.onDidDismiss().then(() => this.loadUsers());
  }
}
