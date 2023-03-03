import { TestBed } from '@angular/core/testing';

import { CaixaTypeService } from './caixa-subcategory.service';

describe('CaixaTypeService', () => {
  let service: CaixaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
