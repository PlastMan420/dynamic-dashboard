import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { PageLoader } from '../../decorators';
import { AppState } from '../../state/app.state';
import { cacheData } from '../../state/data-cache/cache.actions';
import { selectAllData } from '../../state/data-cache/cache.selectors';
import { TableData, TablePage } from '../../types/types';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [HeaderComponent, TableModule, InputTextModule],
  standalone: true,
})
export class UserListComponent {
  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.dataStore$ = this.store.select(selectAllData);
    this.dataStore$.subscribe((x) => {
      // O(n)
      this.dataSource = x.data.data;
    });

    this.loadCustomers();
  }

  title = 'dynamic-dashboard';
  dataSource!: TableData[];
  totalRecords = 0;
  rowsPerPage = 0;
  dataStore$;

  @PageLoader
  async loadCustomers(event?: TableLazyLoadEvent) {
    let page = 1;
    if (event) {
      if (this.dataSource && (event.first ?? 0) > 0) {
        page = this.totalRecords / (event.first || 1);
      }
    }

    const firstPage = await this.getCustomers(page);
    this.storeData(firstPage);

    // artificial delay to test page loader
    await this.delay(900).then(() => console.log('ran after 1 second1 passed'));
  }

  /**
   *
   * @param data
   * Store data to NGRX store
   */
  storeData(data: TablePage) {
    this.totalRecords = data.total;
    this.rowsPerPage = data.per_page;

    this.store.dispatch(cacheData({ page: data }));
  }

  /**
   *
   * @param page
   * @returns Promise<TablePage>
   *
   * Fetch list of users from API
   */
  async getCustomers(page: number = 1): Promise<TablePage> {
    return firstValueFrom(
      this.httpClient.get<TablePage>(`https://reqres.in/api/users?page=${page}`)
    );
  }

  /**
   *
   * @param userId number
   * Go to user details page
   */
  goToUserDetails(userId: number) {
    this.router.navigateByUrl(`user/${userId}`);
  }

  /**
   *
   * @param filter HTMLInputElement
   * @param table PrimeNg Table
   * @returns void
   *
   * Filter table. Searching only works for currently displayed page, since a search API endpoint was not provided.
   */
  searchUser(filter: HTMLInputElement, table: Table) {
    console.log(filter.value.length);
    if (filter.value.length === 0) {
      table.lazy = true;
      table.reset();
      table.rows = this.rowsPerPage;
      table.totalRecords = this.totalRecords;
      return;
    }

    // PrimeNG's table does not search while in lazy mode.
    table.lazy = false;
    table.filterGlobal(filter.value, 'contains');
  }

  delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
