import { UserFilter } from 'src/app/models/userFilter';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserFacadeService } from 'src/app/facades/user-facade.service';
import { Constants } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { DatePipe } from '@angular/common';
import { CustomizedMonth } from 'src/app/models/customizedMonth';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  users: User[];
  isLoading: boolean;
  filter: UserFilter;
  currentMonth: CustomizedMonth;
  constructor(
    private userSerice: UserService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.filter = new UserFilter();
    const datepipe: DatePipe = new DatePipe('en');
    this.filter.birthdayMonth = datepipe.transform(Date.now(), 'MM');
    this.currentMonth = new CustomizedMonth(Number(this.filter.birthdayMonth));
    this.loadUsers();
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
}
