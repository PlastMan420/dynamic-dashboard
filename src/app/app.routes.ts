import { Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    data: { animation: 'openClosePage' }
  },
  {
    path: '',
    component: UserListComponent,
    data: { animation: 'openClosePage' }
  }
];
