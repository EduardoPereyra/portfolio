import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartItem } from './cart-item';
import { Store } from '@ngrx/store';
import { SkillDTO } from '../../models/skill';
import * as CartActions from '../../store/actions/cart.actions';
import { TestBed } from '@angular/core/testing';

describe('CartItem', () => {
  let component: CartItem;
  let mockStore: { dispatch: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockStore = {
      dispatch: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: mockStore }],
    });

    component = TestBed.runInInjectionContext(() => new CartItem());
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have faTrash icon defined', () => {
    expect(component.faTrash).toBeDefined();
  });

  it('should initialize with empty SkillDTO', () => {
    expect(component.item).toBeInstanceOf(SkillDTO);
  });

  it('should dispatch removeFromCart action when removeFromCart is called', () => {
    const testId = 'test-skill-id';
    component.removeFromCart(testId);

    expect(mockStore.dispatch).toHaveBeenCalledWith(CartActions.removeFromCart({ id: testId }));
  });

  it('should dispatch removeFromCart action with correct payload', () => {
    const testId = 'skill-123';
    component.removeFromCart(testId);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    const callArgs = (mockStore.dispatch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callArgs.id).toBe(testId);
  });
});
