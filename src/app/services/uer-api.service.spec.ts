import { TestBed } from '@angular/core/testing';

import { UerApiService } from './uer-api.service';

describe('UerApiService', () => {
  let service: UerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
