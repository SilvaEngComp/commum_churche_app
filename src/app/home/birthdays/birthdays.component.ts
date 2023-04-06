import { UserCSV } from './../../models/birthdayExport';
import { DownloadService } from './../../services/download.service';
import { UserFilter } from 'src/app/models/userFilter';
import { UserService } from './../../services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { DatePipe } from '@angular/common';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  users: User[];
  isLoading: boolean;
  filter: UserFilter;
  currentMonth: CustomizedMonth;
  isLoggedIn: boolean;
  localPageTitle: string;
  user: User;
  constructor(
    private userSerice: UserService,
    private exceptionService: ExceptionService,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {
    this.filter = new UserFilter();
    const datepipe: DatePipe = new DatePipe('en');
    this.filter.birthdayMonth = datepipe.transform(Date.now(), 'MM');
    this.currentMonth = new CustomizedMonth(Number(this.filter.birthdayMonth));
    this.isLoggedIn = LoginService.isLogged();

    this.localPageTitle = Constants.TITLE_BIRTHDAYS;
    this.loadUsers();
  }

  back() {
    this.returnPage.emit(Constants.MENU_GENERAL_OPTION_USER);
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

  loadUsers() {
    this.isLoading = true;
    this.userSerice.getBirthdays(this.filter).then((responser) => {
      this.isLoading = false;
      this.users = responser.data;

      const x = -1;
      const y = 1;
      this.users.sort((a, b) => {
        const aDay = a.birthDate.split('-')[2];
        const bDay = b.birthDate.split('-')[2];
        return aDay < bDay ? x : y;
      });
      this.checkImage();
    });
  }

  async sendEmail() {
    if (this.isLoggedIn) {
      this.user = LoginService.getUser();
    }
    this.exceptionService.loadingFunction(
      'Enviando para o email ' + this.user?.email
    );
    this.downloadService.exportAsExcelFile(
      UserCSV.getTable(UserCSV.getRelatorio(this.users)),
      'Aniversariantes do mês de ' + this.currentMonth?.name,
      2
    );
    this.exceptionService.openLoading('Email enviado com sucesso!');
  }

  async download() {
    this.exceptionService.loadingFunction('Processando Tabela Excel...');
    this.downloadService.buildUserExcel(this.users, 'Aniversariantes do Mês');
  }
}
