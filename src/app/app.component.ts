import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TableData, TablePage, UserDetails } from './types/types';
import { PageLoader } from './decorators';
import { Store } from '@ngrx/store';
import { cacheData } from './state/data-cache/cache.actions';
import { selectAllData } from './state/data-cache/cache.selectors';
import { AsyncPipe } from '@angular/common';
import { AppState } from './state/app.state';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: TablePage = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Lindsay',
      last_name: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg',
    },
    {
      id: 9,
      email: 'tobias.funke@reqres.in',
      first_name: 'Tobias',
      last_name: 'Funke',
      avatar: 'https://reqres.in/img/faces/9-image.jpg',
    },
    {
      id: 10,
      email: 'byron.fields@reqres.in',
      first_name: 'Byron',
      last_name: 'Fields',
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
    },
    {
      id: 11,
      email: 'george.edwards@reqres.in',
      first_name: 'George',
      last_name: 'Edwards',
      avatar: 'https://reqres.in/img/faces/11-image.jpg',
    },
    {
      id: 12,
      email: 'rachel.howell@reqres.in',
      first_name: 'Rachel',
      last_name: 'Howell',
      avatar: 'https://reqres.in/img/faces/12-image.jpg',
    },
  ],
  support: {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TableModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
    this.dataStore$ = this.store.select(selectAllData);
    this.dataStore$.subscribe(x => {
      console.log('store', x);
      // O(n)
      this.dataSource = x.data.flatMap(x => x.data);
    })

    this.loadCustomers();
  }
  title = 'dynamic-dashboard';
  dataSource!: TableData[];

  dataStore$;

  loading: boolean = false;
  loaded = false;

  @PageLoader
  async loadCustomers(event?: TableLazyLoadEvent) {
    let page = 1;

    // if (this.dataSource && (event.first ?? 0) > 0) {
    //   page = this.dataSource.total / (event.first || 1);
    // }

    // check if page number is in store
    // if not: API call
    // if exists: fetch from store

    const firstPage = await this.getCustomers(page);
    console.log('first page', firstPage)
    this.storeData(firstPage);
  }

  storeData(data: TablePage) {
    this.store.dispatch(cacheData({ page: data }));
    this.loaded = true;
  }

  getData(pageNumber: number) {}

  async getCustomers(page: number = 1): Promise<TablePage> {
    return firstValueFrom(
      this.httpClient.get<TablePage>(`https://reqres.in/api/users?page=${page}`)
    );
  }

  goToUserDetails(userId: number) {
    return firstValueFrom(
      this.httpClient.get<UserDetails>(`https://reqres.in/api/users/${userId}`)
    );
  }
}
