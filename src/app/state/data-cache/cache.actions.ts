import { createAction, props } from '@ngrx/store';
import { TableData, TablePage } from '../../types/types';

export const cacheData = createAction(
  '[HOME] CACHE USERS',
  props<{ page: TablePage }>()
);
