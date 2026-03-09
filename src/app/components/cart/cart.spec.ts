import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Cart } from './cart';
import { Store } from '@ngrx/store';
import * as CartActions from '../../store/actions/cart.actions';
import * as CartSelectors from '../../store/selectors/cart.selectors';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SkillDTO } from '../../models/skill';

describe('Cart Component', () => {
  let component: Cart;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      select: vi.fn(),
      dispatch: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: mockStore }],
    });

    component = TestBed.createComponent(Cart).componentInstance;

    mockStore.select.mockImplementation((selector: any) => {
      if (selector === CartSelectors.selectCartSkills) {
        return of([]);
      } else if (selector === CartSelectors.selectCartLoading) {
        return of(false);
      } else if (selector === CartSelectors.selectCartError) {
        return of(null);
      } else if (selector === CartSelectors.selectCartTotalSkills) {
        return of(0);
      }
      return of(null);
    });
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch loadCart on ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(CartActions.loadCart());
  });

  it('should dispatch clearCart when clearCart is called', () => {
    component.clearCart();
    expect(mockStore.dispatch).toHaveBeenCalledWith(CartActions.clearCart());
  });

  it('should initialize contact form with empty values', () => {
    expect(component.contactModel().fullName).toBe('');
    expect(component.contactModel().email).toBe('');
    expect(component.contactModel().phone).toBe('');
    expect(component.contactModel().company).toBe('');
    expect(component.contactModel().notes).toBe('');
  });

  it('should mark form as touched if invalid on checkout', () => {
    const event = new Event('submit');
    vi.spyOn(event, 'preventDefault');

    component.handleCheckout(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.contactForm().touched()).toBe(true);
  });

  it('should reset contact form and cart after successful checkout', async () => {
    const mockItems = [{ id: '1', name: 'TypeScript' }] as SkillDTO[];
    mockStore.select.mockImplementation((selector: any) => {
      if (selector === CartSelectors.selectCartSkills) {
        return of(mockItems);
      }
      return of(null);
    });

    component.items$ = of(mockItems);

    component.contactModel.set({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      company: 'Test Corp',
      notes: 'Test notes',
    });

    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      href: '',
    });

    const event = new Event('submit');
    vi.spyOn(event, 'preventDefault');

    component.handleCheckout(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.contactModel().fullName).toBe('');
    expect(component.contactModel().email).toBe('');
  });

  it('should select cart items from store', () => {
    const mockItems = [{ id: '1', name: 'TypeScript' }] as SkillDTO[];
    mockStore.select.mockReturnValueOnce(of(mockItems));
    component.items$ = of(mockItems);

    component.items$.subscribe(async (items) => {
      expect(items).toEqual(mockItems);
    });
  });

  it('should select loading state from store', () => {
    mockStore.select.mockReturnValueOnce(of(true));
    component.loading$ = of(true);

    component.loading$.subscribe(async (loading) => {
      expect(loading).toBe(true);
    });
  });

  it('should handle checkout with valid form data', () => {
    const mockItems = [{ id: '1', name: 'TypeScript' }] as SkillDTO[];
    mockStore.select.mockImplementation((selector: any) => {
      if (selector === CartSelectors.selectCartSkills) {
        return of(mockItems);
      }
      return of(null);
    });

    component.items$ = of(mockItems);

    component.contactModel.set({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      company: 'Test Corp',
      notes: 'Test notes',
    });

    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      href: '',
    });

    const event = new Event('submit');
    vi.spyOn(event, 'preventDefault');

    component.handleCheckout(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(CartActions.clearCart());
  });

  it('should select error state from store', async () => {
    const mockError = 'Failed to load cart';
    component.error$ = of(mockError);

    component.error$.subscribe((error) => {
      expect(error).toBe(mockError);
    });
  });

  it('should select total items from store', async () => {
    component.totalItems$ = of(5);

    component.totalItems$.subscribe((total) => {
      expect(total).toBe(5);
    });
  });
});
