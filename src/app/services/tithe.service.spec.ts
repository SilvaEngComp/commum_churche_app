import { TestBed } from '@angular/core/testing';

import { TitheService } from './tithe.service';

describe('TitheService', () => {
  let service: TitheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
