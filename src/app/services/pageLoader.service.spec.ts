/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageLoaderService } from './pageLoader.service';

describe('Service: PageLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageLoaderService]
    });
  });

  it('should ...', inject([PageLoaderService], (service: PageLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
