import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { environment } from 'src/environments/environment';
import { UiService } from 'src/app/services/ui.service';
/* eslint-disable @typescript-eslint/member-ordering */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() showSelect?: boolean;

  limit: number;

  apiResponse: any[] = [];
  apiResponseAdapted: any[] = [];
  listAux: any[] = [];

  customPopoverOptions = {};
  constructor(private userFacedeService: UserFacadeService) {}

  ngOnInit() {
    this.selected = '';
    this.load();
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

  async load() {
    // if (this.listName === 'brands') {
    //   this.apiResponse = UiService.localGet('localBrands');
    //   this.brandFacadeService.dataLoaded.subscribe((data) => {
    //     this.apiResponse = data.list;
    //     this.apiResponseAdapted = MySelectAdapter.toMySelectAny(
    //       this.apiResponse
    //     );
    //     this.listAux = this.apiResponseAdapted;
    //   });
    // } else if (this.listName === 'categories') {
    //   this.apiResponse = UiService.localGet('localCategories');
    //   this.categoryFacadeService.dataLoaded.subscribe((data) => {
    //     this.apiResponse = data.list;
    //     this.apiResponseAdapted = MySelectAdapter.toMySelectAny(
    //       this.apiResponse
    //     );
    //     this.listAux = this.apiResponseAdapted;
    //   });
    // } else if (this.listName === 'customers') {
    //   this.apiResponse = UiService.localGet(environment.LOCAL_CUSTOMER);
    //   this.userFacedeService.load();
    //   this.userFacedeService.dataLoaded.subscribe((data) => {
    //     this.apiResponse = data.list;
    //     this.apiResponseAdapted = MySelectAdapter.toMySelectAny(
    //       this.apiResponse
    //     );
    //     this.listAux = this.apiResponseAdapted;
    //   });
    // }
    // this.apiResponseAdapted = MySelectAdapter.toMySelectAny(this.apiResponse);
    // this.listAux = this.apiResponseAdapted;
    // if (this.apiResponse.length < this.limit) {
    //   this.limit = this.apiResponse.length;
    // } else {
    //   this.limit = 10;
    // }
  }

  onSelect(ev) {
    const value = ev.target.value;
    const result = this.apiResponse.filter((obj) =>
      obj.name.toLowerCase().includes(value.toLowerCase())
    );

    if (result) {
      const obj = result[0];
      this.selectEmiter.emit(obj);
      this.selected = obj.name;
    }
  }
  onSelectSearch(ev: any) {
    const value = ev.value;
    const result = this.apiResponse.filter((obj) =>
      obj.name.toLowerCase().includes(value.toLowerCase())
    );

    if (result) {
      const obj = result[0];
      this.selectEmiter.emit(obj);
      this.selected = obj.name;
    }
    this.filtredSearch = [];
  }

  createNew() {
    // if (this.listName === 'brands') {
    //   this.brandFacadeService.create();
    //   this.brandFacadeService.dataLoaded.subscribe((data) => {
    //     this.apiResponse = data.list;
    //     if (this.apiResponse != null && this.apiResponse?.length > 0) {
    //       this.apiResponseAdapted = MySelectAdapter.toMySelectAny(
    //         this.apiResponse
    //       );
    //       this.listAux = this.apiResponseAdapted;
    //       this.onSelectTLastCreated();
    //     }
    //   });
    // } else if (this.listName === 'categories') {
    //   this.categoryFacadeService.create();
    //   this.categoryFacadeService.dataLoaded.subscribe((data) => {
    //     this.apiResponse = data.list;
    //     if (this.apiResponse != null && this.apiResponse?.length > 0) {
    //       this.apiResponseAdapted = MySelectAdapter.toMySelectAny(
    //         this.apiResponse
    //       );
    //       this.onSelectTLastCreated();
    //       this.listAux = this.apiResponseAdapted;
    //     }
    //   });
    // }
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
  filtredSearch: any[] = [];

  // função que consulta a lista de produtos
  searchBar() {
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
      this.filtredSearch = [];
    }
  }
}
