import { TestBed } from '@angular/core/testing';

import { InputMethodService } from './input-method.service';

describe('InputMethodService', () => {
  let service: InputMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
