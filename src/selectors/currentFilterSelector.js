import { createSelector } from '@reduxjs/toolkit';

export const currentFilterSelector = createSelector(
    state => state.filtersSlice.currentFilter,
    currentFilter => currentFilter
)