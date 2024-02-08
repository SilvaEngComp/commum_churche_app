import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BalanceTrimestralGraphComponent } from './balance-trimestral-graph.component';

describe('BalanceTrimestralGraphComponent', () => {
  let component: BalanceTrimestralGraphComponent;
  let fixture: ComponentFixture<BalanceTrimestralGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceTrimestralGraphComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceTrimestralGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
