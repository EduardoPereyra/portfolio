// store/cart.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import * as CartActions from '../actions/cart.actions';
import * as CartSelectors from '../../store/selectors/cart.selectors';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class CartEffects {
  actions$ = inject(Actions);
  store = inject(Store);

  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCartSuccess,
          CartActions.removeFromCart,
          CartActions.updateQuantity,
          CartActions.clearCart,
        ),
        withLatestFrom(this.store.select(CartSelectors.selectCartSkills)),
        tap(([action, cartSkills]) => {
          localStorage.setItem('cart', JSON.stringify(cartSkills));
        }),
      ),
    { dispatch: false },
  );

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() => {
        const savedCart = localStorage.getItem('cart');
        const skills = savedCart ? JSON.parse(savedCart) : [];

        return [CartActions.loadCartSuccess({ skills })];
      }),
    ),
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      switchMap(({ skill }) => {
        return of(skill).pipe(
          map((validatedSkill) => {
            return CartActions.addToCartSuccess({ skill: validatedSkill });
          }),
          catchError((error) => of(CartActions.addToCartFailure({ error: error.message }))),
        );
      }),
    ),
  );
}
