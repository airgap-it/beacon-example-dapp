import { TestBed } from '@angular/core/testing';

import { BeaconService } from './beacon.service';

describe('BeaconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeaconService = TestBed.get(BeaconService);
    expect(service).toBeTruthy();
  });
});
