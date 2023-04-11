import { UiService } from './../../../services/ui.service';
import { ViewChild, AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, IonInput, ModalController } from '@ionic/angular';
import { UserFilter } from 'src/app/models/userFilter';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class SearchUserComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInput: IonInput;

  users: User[] = null;
  userelecionado: User;
  nome: string;
  @Input() filtro: UserFilter;
  @Input() cadastrar: boolean;
  limit: number;
  role: string;
  constructor(
    private popoverController: PopoverController,
    private userFacadeService: UserFacadeService
  ) {}
  ngAfterViewInit(): void {
    this.searchInput.setFocus();
  }
  ngOnInit() {
    this.limit = 10;
    this.userFacadeService.dataLoaded.subscribe((data) => {
      this.users = data;
    });

    this.getUsers();
  }
  back(user: User) {
    this.popoverController.dismiss({ user });
  }

  getUsers() {
    this.userFacadeService.load();
  }

  searchUser(search) {
    this.nome = search.toLowerCase();
    this.users = this.userFacadeService.searchUser(this.nome);
  }

  selectedUser(user: User) {
    this.back(user);
  }

  register() {
    this.userFacadeService.registerUser(true);
  }
  resetLimit(event: any) {
    if (this.limit <= this.users.length) {
      this.limit += 10;
      event.target.complete();
    } else {
      event.target.disabled = true;
    }
  }
}
