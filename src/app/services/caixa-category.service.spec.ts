import { TestBed } from '@angular/core/testing';

import { CaixaCategoryService } from './caixa-category.service';

describe('CaixaCategoryService', () => {
  let service: CaixaCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
