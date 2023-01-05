import { ConstantMessages } from './../../models/messages';
import { FilterComponent } from './filter/filter.component';
import { ModalController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { ExceptionService } from '../../services/exception-service.service';
import { IonInput } from '@ionic/angular';
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

  letterSize: string;
  letterSizeConfig: number;

  @ViewChild('searchUser', { static: false }) inputSearch: IonInput;

  constructor(
    private userFacadeService: UserFacadeService,
    private exceptionService: ExceptionService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_USER_MEMBERS
    );

    UiService.pageTitle.emit(Constants.TITLE_USER_MEMBERS);

    this.loadUsers();
    this.letterSizeConfig = UiService.localGet(
      Constants.USER_LETTER_SIZE_CONFIG
    );
    if (!this.letterSizeConfig) {
      this.letterSizeConfig = 12;
    }

    this.letterSize = this.letterSizeConfig + 'pt';
    this.userFacadeService.dataLoaded.subscribe((data) => {
      this.setConfigPagination(true);
      this.isLoading = false;
      this.users = data.data;
      this.checkImage();
      UiService.localSet('upperUserLimit', 10);
      UiService.localSet('inferiorUserLimit', 0);
    });
  }

  setLetterSize(isUpper: boolean) {
    if (this.letterSizeConfig < 5 && !isUpper) {
      this.exceptionService.alertDialog(
        'Alerta!',
        ConstantMessages.MSG_MAX_LIMIT_LETTER
      );
    }
    if (this.letterSizeConfig > 30 && isUpper) {
      this.exceptionService.alertDialog(
        'Alerta!',
        ConstantMessages.MSG_MAX_LIMIT_LETTER
      );
    }
    if (isUpper) {
      this.letterSizeConfig++;
    } else {
      this.letterSizeConfig--;
    }

    this.letterSize = this.letterSizeConfig + 'pt';
    UiService.localSet(
      Constants.USER_LETTER_SIZE_CONFIG,
      this.letterSizeConfig
    );
  }

  setConfigPagination(isRestart = false) {
    this.tresholderPagination = 10;
    if (isRestart) {
      this.inferiorLimit = 0;
      this.upperLimit = this.tresholderPagination;
      this.paginationNumber = this.upperLimit / this.tresholderPagination;
      return;
    }
    this.inferiorLimit = UiService.localGet('inferiorUserLimit');
    this.upperLimit = UiService.localGet('upperUserLimit');
    if (!this.inferiorLimit) {
      this.inferiorLimit = 0;
    }
    if (!this.upperLimit) {
      this.upperLimit = this.tresholderPagination;
    }

    this.paginationNumber = this.upperLimit / this.tresholderPagination;
  }

  loadUsers() {
    console.log('is loading');
    this.isLoading = true;
    this.userFacadeService.load();
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
    UiService.localSet(Constants.USER_SUPERIOR_LIMIT, this.upperLimit);
    UiService.localSet(Constants.USER_INFERIOR_LIMIT, this.inferiorLimit);
  }

  search(search: any) {
    this.users = null;
    this.users = this.userFacadeService.searchUser(search);
    this.setConfigPagination(true);

    this.checkImage();
  }

  async newUser() {
    this.sessionPage.emit(Constants.PAGE_ADMIN_REGISTER);
  }

  edit(user: User = null) {
    if (!user) {
      UiService.localRemove(Constants.USER_MAINTAINCE);
    } else {
      UiService.localSet(Constants.USER_MAINTAINCE, user);
    }
    UiService.localSet(Constants.HAS_BACK_PAGE, true);
    this.sessionPage.emit(Constants.MENU_USER_OPTION_PROFILE);
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

  // async openFilter() {
  //   const modal = this.modalController.create({
  //     component: FilterComponent,
  //   });

  //   (await modal).present();

  //   const { data } = await (await modal).onWillDismiss();
  //   this.loadUsers();
  // }

  receiveFilter(ev: any) {
    this.loadUsers();
  }
}
