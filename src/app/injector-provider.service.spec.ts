/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InjectorProviderService } from './injector-provider.service';

describe('Service: InjectorProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InjectorProviderService]
    });
  });

  it('should ...', inject([InjectorProviderService], (service: InjectorProviderService) => {
    expect(service).toBeTruthy();
  }));
});
