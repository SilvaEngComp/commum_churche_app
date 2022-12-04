import { TestBed } from '@angular/core/testing';

import { CaixaFacadeService } from './caixa-facade.service';

describe('CaixaFacadeService', () => {
  let service: CaixaFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
