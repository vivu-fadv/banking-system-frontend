import { TestBed } from '@angular/core/testing';

import { AccountService } from '../Service/account.service'; // Ensure the path is correct

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
