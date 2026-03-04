import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { SkillDTO } from '../../models/skill';

export interface CartState {
  skills: SkillDTO[];
  totalSkills: number;
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  skills: [],
  totalSkills: 0,
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.addToCartSuccess, (state, { skill }) => {
    const existingItemIndex = state.skills.findIndex((i) => i.id === skill.id);
    let updatedItems;

    if (existingItemIndex >= 0) {
      // Item exists
      updatedItems = state.skills;
    } else {
      // New item
      updatedItems = [...state.skills, skill];
    }
    return {
      ...state,
      skills: updatedItems,
      loading: false,
      totalSkills: state.totalSkills + 1,
      error: null,
    };
  }),
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CartActions.removeFromCart, (state, { id }) => ({
    ...state,
    skills: state.skills.filter((s) => s.id !== id),
    totalSkills: state.totalSkills - 1,
    error: null,
  })),
  on(CartActions.clearCart, () => ({
    ...initialState,
  })),
  on(CartActions.loadCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.loadCartSuccess, (state, { skills }) => {
    return {
      ...state,
      skills,
      loading: false,
      ...(skills.length !== undefined && { totalSkills: skills.length }),
    };
  }),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
