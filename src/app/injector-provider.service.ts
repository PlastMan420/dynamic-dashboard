import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InjectorProvider {
  constructor(private injector: Injector) {
    InjectorProvider.injector = injector;
  }

  private static injector: Injector;

  static get getInjector() {
    return InjectorProvider.injector;
  }
}
