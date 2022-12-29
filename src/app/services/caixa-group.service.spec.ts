import { TestBed } from '@angular/core/testing';

import { CaixaGroupService } from './caixa-group.service';

describe('CaixaGroupService', () => {
  let service: CaixaGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
