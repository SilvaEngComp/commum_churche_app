/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { ExceptionService } from '../../services/exception-service.service';
import { ModalController, IonInput } from '@ionic/angular';
import { UserRegisterComponent } from './user-register/user-register.component';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { UiService } from 'src/app/services/ui.service';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
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

  isFilterShowed: boolean;
  funcIsLoading: boolean;
  label: string;
  inferiorLimit: number;
  upperLimit: number;
  paginationNumber: number;
  tresholderPagination: number;

  @ViewChild('searchUser', { static: false }) inputSearch: IonInput;

  constructor(
    private userFacadeService: UserFacadeService,
    private modalCtrl: ModalController,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.loadUsers();

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
      this.isLoading = false;
      this.users = data.data;
      this.checkImage();
      console.log(this.users);
      UiService.localSet('upperUserLimit', 10);
      UiService.localSet('inferiorUserLimit', 0);
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.userFacadeService.load();
  }

  setShowFilterseller() {
    this.isSellerShowed = !this.isSellerShowed;
    UiService.localSet('isSellerShowed', this.isSellerShowed);
  }

  setShowFilterCustomer() {
    this.isFilterCustomerShowed = !this.isFilterCustomerShowed;
    UiService.localSet('isFilterCustomerShowed', this.isFilterCustomerShowed);
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
    this.checkImage();
  }

  async newUser() {
    this.sessionPage.emit('0');
  }

  async edit(user: User) {
    this.exceptionService.alertDialog(
      Constants.IN_DEVELOPMENT,
      Constants.IN_DEVELOPMENT_TITLE
    );
    // const modal = await this.modalCtrl.create({
    //   component: UserRegisterComponent,
    //   componentProps: { user, permission: this.permission, op: 'user-alter' },
    // });

    // await modal.present();

    // await modal.onDidDismiss().then(() => this.loadUsers());
  }

  delete(user: User) {
    this.userFacadeService.delete(user);
  }

  setShowDetail(user: User) {
    const position = this.users.indexOf(user);

    this.users[position].showDetails = !this.users[position].showDetails;
  }

  checkImage() {
    this.users.filter((user) => {
      if (!user?.image) {
        if (user?.gender.toLocaleLowerCase().includes('masculino')) {
          user.image = Constants.MALE_PERSON;
        } else {
          user.image = Constants.FEMALE_PERSON;
        }
      }
    });
  }
}
