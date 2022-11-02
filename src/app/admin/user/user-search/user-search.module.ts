import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchUserComponent } from './user-search.component';

@NgModule({
  declarations: [SearchUserComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [SearchUserComponent],
})
export class UserSearchModule {}
