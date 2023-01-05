import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationChurchScheduleComponent } from './publicationapp-church-schedule.component';

describe('PublicationChurchScheduleComponent', () => {
  let component: PublicationChurchScheduleComponent;
  let fixture: ComponentFixture<PublicationChurchScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationChurchScheduleComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationChurchScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
