import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartSkills = createSelector(selectCartState, (state) => state.skills ?? []);
export const selectCartLoading = createSelector(selectCartState, (state) => state.loading);
export const selectCartError = createSelector(selectCartState, (state) => state.error);

export const selectCartTotalSkills = createSelector(selectCartState, (state) => state.totalSkills);
export const selectCartSkillById = (id: string) =>
  createSelector(selectCartSkills, (skills) => skills.find((skill) => skill.id === id));
