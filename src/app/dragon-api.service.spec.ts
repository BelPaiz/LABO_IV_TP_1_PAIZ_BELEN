import { TestBed } from '@angular/core/testing';

import { DragonAPIService } from './services/dragon-api.service';

describe('DragonAPIService', () => {
  let service: DragonAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
