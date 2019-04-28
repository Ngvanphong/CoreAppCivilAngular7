import { TestBed, async, inject } from '@angular/core/testing';

import { Auth.GuardGuard } from './auth.guard.guard';

describe('Auth.GuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.GuardGuard]
    });
  });

  it('should ...', inject([Auth.GuardGuard], (guard: Auth.GuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
