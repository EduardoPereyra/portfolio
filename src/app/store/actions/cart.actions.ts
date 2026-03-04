import { createAction, props } from '@ngrx/store';
import { SkillDTO } from '../../models/skill';

export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ skills: SkillDTO[] }>(),
);
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: string }>());
export const addToCart = createAction('[Cart] Add Skill to Cart', props<{ skill: SkillDTO }>());
export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ skill: SkillDTO }>(),
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: string }>(),
);

export const removeFromCart = createAction(
  '[Cart] Remove Skill from Cart',
  props<{ id: string }>(),
);
export const clearCart = createAction('[Cart] Clear Cart');
export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ id: number; quantity: number }>(),
);
