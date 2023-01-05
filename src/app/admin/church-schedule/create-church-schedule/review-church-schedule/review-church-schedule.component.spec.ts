import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReviewChurchScheduleComponent } from './review-church-schedule.component';

describe('ReviewChurchScheduleComponent', () => {
  let component: ReviewChurchScheduleComponent;
  let fixture: ComponentFixture<ReviewChurchScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewChurchScheduleComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewChurchScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
