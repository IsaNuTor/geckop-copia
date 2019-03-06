import { TestBed } from '@angular/core/testing';

import { DbConnectionService } from './db-connection.service';

describe('DbConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbConnectionService = TestBed.get(DbConnectionService);
    expect(service).toBeTruthy();
  });
});
