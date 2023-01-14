import { ChurchScheduleTypeService } from 'src/app/services/church-schedule-type.service';
import { ChurchScheduleFilter } from './../../models/churchScheduleFilter';
import { UiService } from './../../services/ui.service';
import { PopoverController } from '@ionic/angular';
/* eslint-disable max-len */
import { ChurchRegisterComponent } from './../../admin/church/church-register/church-register.component';
import { CaixaTypeRegisterComponent } from './../../admin/financy/caixa/caixa-type-register/caixa-type-register.component';
import { CaixaGroupRegisterComponent } from './../../admin/financy/caixa/caixa-group-register/caixa-group-register.component';
import { EmergencyUserRegisterComponent } from '../../admin/user/user-register/emergency-user-register/emergency-user-register.component';
import { ModalController } from '@ionic/angular';
import { ChurchService } from './../../services/church.service';
import { CaixaGroupService } from './../../services/caixa-group.service';
import { UserService } from './../../services/user.service';
/* eslint-disable @typescript-eslint/member-ordering */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MySelectAdapter } from 'src/app/models/mySelectAdapter';
import { UserFilter } from 'src/app/models/userFilter';
import { CaixaTypeService } from 'src/app/services/caixa-type.service';
import { ScheduleTypeRegisterComponent } from 'src/app/admin/church-schedule/schedule-type-register/schedule-type-register.component';

@Component({
  selector: 'app-my-select-list',
  templateUrl: './my-select-list.component.html',
  styleUrls: ['./my-select-list.component.scss'],
})
export class MySelectListComponent implements OnInit {
  @Output() selectEmiter: EventEmitter<any> = new EventEmitter<any>();
  @Input() selected?: any;
  @Input() label?: string;
  @Input() create?: boolean;
  @Input() listName?: any;
  @Input() isRequired?: boolean;
  @Input() obj?: any;
  showSelect?: boolean;
  isLoading: boolean;
  limit: number;

  apiResponse: any[] = [];
  filtredSearch: MySelectAdapter[] = [];
  apiResponseAdapted: MySelectAdapter[] = [];
  listAux: any[] = [];

  customPopoverOptions = {
    header: 'Teste',
  };
  constructor(
    private userService: UserService,
    private caixaGroupService: CaixaGroupService,
    private caixaTypeService: CaixaTypeService,
    private churchService: ChurchService,
    private churchScheduleTypeService: ChurchScheduleTypeService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.selected = '';
    this.showSelect = false;
    this.load();

    UiService.mySelectEmitter.subscribe((data) => {
      console.log(data);
      if (data?.obj) {
        this.obj = data?.obj;
      }
      console.log(`${data?.listName} === ${this.listName}`);
      if (data?.listName === this.listName) {
        console.log(this.obj);
        this.load(this.obj);
      }
    });
  }

  setShowSelect() {
    this.showSelect = !this.showSelect;
  }
  onScroll(ev: any) {
    if (this.limit <= this.apiResponse.length) {
      if (
        Math.round(ev.target.scrollTop + ev.target.offsetHeight) ===
        ev.target.scrollHeight
      ) {
        this.limit += 10;
      }
    }
  }

  busca(ev: any) {
    const cod = ev.target.value.toLowerCase();
    this.apiResponseAdapted = this.listAux.filter((obj) =>
      obj.value.toLowerCase().includes(cod)
    );
  }

  async load(obj: any = null, isReload: boolean = false) {
    this.isLoading = true;

    if (this.listName === 'users') {
      // this.apiResponse = UiService.localGet('localUsers');
      const responser = await this.userService.get(new UserFilter());
      this.apiResponse = responser.data;
    } else if (this.listName === 'groups') {
      // this.apiResponse = UiService.localGet('localGroups');
      const responser = await this.caixaGroupService.get();
      this.apiResponse = responser.data;
    } else if (this.listName === 'types') {
      // this.apiResponse = UiService.localGet('localGroups');
      const responser = await this.caixaTypeService.get();
      this.apiResponse = responser.data;
    } else if (this.listName === 'churches') {
      // this.apiResponse = UiService.localGet('localGroups');
      const responser = await this.churchService.get();
      this.apiResponse = responser.data;
    } else if (this.listName === 'churchScheduleTypes') {
      const filter: ChurchScheduleFilter = new ChurchScheduleFilter();
      if (obj) {
        console.log(obj);
        filter.church = obj.church;
      }
      const responser = await this.churchScheduleTypeService.get(filter);
      this.apiResponse = responser.data;
    }

    this.apiResponseAdapted = MySelectAdapter.toMySelectAny(this.apiResponse);
    this.listAux = this.apiResponseAdapted;
    this.apiResponseAdapted = MySelectAdapter.toMySelectAny(this.apiResponse);
    this.listAux = this.apiResponseAdapted;
    this.filtredSearch = this.apiResponseAdapted;
    if (this.apiResponse.length < this.limit) {
      this.limit = this.apiResponse.length;
    } else {
      this.limit = 10;
    }

    if (isReload) {
      this.onSelect(
        this.apiResponseAdapted[this.apiResponseAdapted?.length - 1]
      );
    }

    this.isLoading = false;
  }

  onSelect(mySelectAdapter: MySelectAdapter) {
    const result = this.apiResponse.filter((obj) =>
      obj.name.toLowerCase().includes(mySelectAdapter.value.toLowerCase())
    );

    if (result) {
      const obj = result[0];
      this.selectEmiter.emit(obj);
      this.selected = obj.name;
    }
    this.filtredSearch = this.apiResponseAdapted;
    this.setShowSelect();
  }

  async createNew(event: any) {
    let component = null;
    if (this.listName === 'users') {
      component = EmergencyUserRegisterComponent;
    } else if (this.listName === 'groups') {
      component = CaixaGroupRegisterComponent;
    } else if (this.listName === 'types') {
      component = CaixaTypeRegisterComponent;
    } else if (this.listName === 'churches') {
      component = ChurchRegisterComponent;
    } else if (this.listName === 'churchScheduleTypes') {
      component = ScheduleTypeRegisterComponent;
    }
    const modal = await this.popCtrl.create({
      component,
      componentProps: { apiResponse: this.apiResponse },
      event,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data) {
      const selected = MySelectAdapter.toSingleMySelectAny(data?.obj);
      console.log(selected);
      this.onSelect(selected);
    } else {
      this.load(true);
    }
  }

  onSelectTLastCreated() {
    const lastPosition = this.apiResponseAdapted.length - 1;
    this.selected = this.apiResponseAdapted[lastPosition].value;
    const result = this.apiResponse.filter((obj) =>
      obj.name.toLowerCase().includes(this.selected.toLowerCase())
    );

    if (result) {
      const obj = result[0];
      this.selectEmiter.emit(obj);
      this.selected = obj.name;
    }
  }

  // função que consulta a lista de produtos
  searchBar(selcted: any) {
    this.selected = selcted;
    if (this.selected.length > 0) {
      const values = this.apiResponseAdapted;
      if (values) {
        this.filtredSearch = [];
        const value = this.selected.toLocaleLowerCase();
        //consulta pela reference
        values.filter((item) => {
          if (item.value) {
            const reference = item.value
              .toLowerCase()
              .substring(0, value.length);
            if (reference === value) {
              this.filtredSearch.push(item);
            }
          }
        });
      } else {
        this.load();
      }
    } else {
      this.filtredSearch = this.apiResponseAdapted;
    }
  }
}
