import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CachedDataState } from "./cache.reducer";
import { AppState } from "../app.state";
import { TablePage } from "../../types/types";

export const selectProductFeature = createFeatureSelector<CachedDataState>('cache');

export const selectAllData = createSelector(
  selectProductFeature,
  (state: CachedDataState) => state
)