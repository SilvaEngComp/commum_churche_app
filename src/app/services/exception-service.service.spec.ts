import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ExceptionService } from './exception-service.service';
describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExceptionService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule ]
    }).compileComponents();


  }));
TestBed.inject(HttpClient);
  TestBed.inject(HttpTestingController);

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(ExceptionService);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // TODO: add more tests!

     // Inject the http service and test controller for each test


});
