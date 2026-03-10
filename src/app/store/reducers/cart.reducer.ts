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
    let updatedItems;
    let skillsList = [...state.skills];

    if (skillsList.length === 0) {
      if (typeof localStorage !== 'undefined') {
        const cart = localStorage.getItem('cart');
        if (cart) {
          const parsedCart = JSON.parse(cart);
          skillsList = parsedCart;
        }
      }
    }

    const existingItemIndex = skillsList.findIndex((i) => i.id === skill.id);

    if (existingItemIndex >= 0) {
      // Item exists
      updatedItems = skillsList;
    } else {
      // New item
      updatedItems = [...skillsList, skill];
    }

    return {
      ...state,
      skills: updatedItems,
      loading: false,
      totalSkills: updatedItems.length,
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
