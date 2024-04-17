import { createReducer, on } from "@ngrx/store";
import { TableData, TablePage } from "../../types/types";
import { cacheData } from "./cache.actions";

export interface CachedDataState {
  data: TablePage,
  error: string | null,
  isLoading: boolean
}

export const initialState: CachedDataState = {
  data: {} as TablePage,
  error: null,
  isLoading: false
}

export const cacheReducer = createReducer(
  initialState,
  on(cacheData, (state, {page}) => ({
    ...state,
    data: page
  })),
)
