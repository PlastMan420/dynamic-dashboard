import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageLoaderService {
  constructor() {}

  pageLoader = signal(false)

  showPageLoader() {
    this.pageLoader.set(true);
  }

  hidePageLoader() {
    this.pageLoader.set(false);
  }
}
