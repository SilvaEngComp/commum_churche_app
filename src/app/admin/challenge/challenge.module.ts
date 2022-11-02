import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChallengePageRoutingModule } from './challenge-routing.module';

import { ChallengePage } from './challenge.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { QuizComponent } from './quiz/quiz.component';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallengePageRoutingModule,
    PipesModule,
    DirectivesModule,
    ClipboardModule
  ],
  declarations: [ChallengePage, QuizComponent],


})
export class ChallengePageModule { }
