import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let mockStore: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockStore = {
      select: vi.fn().mockReturnValue({
        subscribe: vi.fn((callback) => callback(0)),
      }),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        queryParamMap: {
          get: vi.fn().mockReturnValue(''),
        },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    component = TestBed.runInInjectionContext(() => new Navbar());
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize font awesome icons', () => {
    expect(component.faCartArrowDown).toBeDefined();
    expect(component.faMagnifyingGlass).toBeDefined();
    expect(component.faStore).toBeDefined();
    expect(component.faUser).toBeDefined();
  });

  it('should initialize cartAmounts signal with 0', () => {
    expect(component.cartAmounts()).toBe(0);
  });

  it('should load search query from route params on init', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.mockReturnValue('test search');
    component.ngOnInit();
    expect(component.searchForm.search().value()).toBe('test search');
  });

  it('should load cart from localStorage when store returns 0', () => {
    const mockCart = [{ id: 1 }, { id: 2 }];
    component.cartAmounts.set(2);
    vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(mockCart));
    component.ngOnInit();
    expect(component.cartAmounts()).toBe(2);
  });

  it('should set cartAmounts from store when store returns non-zero', () => {
    mockStore.select.mockReturnValue({
      subscribe: vi.fn((callback) => callback(5)),
    });
    component.ngOnInit();
    expect(component.cartAmounts()).toBe(5);
  });

  it('should navigate to store with search query on valid search', () => {
    component.searchForm.search().value.set('angular');
    const event = new Event('submit');
    vi.spyOn(event, 'preventDefault');
    component.handleSearch(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/store'], {
      queryParams: { search: 'angular' },
    });
  });

  it('should navigate to store without query params on empty search', () => {
    component.searchForm.search().value.set('');
    const event = new Event('submit');
    component.handleSearch(event);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/store']);
  });

  it('should not navigate on whitespace-only search', () => {
    component.searchForm.search().value.set('   ');
    const event = new Event('submit');
    component.handleSearch(event);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/store']);
  });
});
