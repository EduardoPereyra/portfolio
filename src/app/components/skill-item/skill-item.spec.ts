import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SkillItem } from './skill-item';
import { SkillDTO } from '../../models/skill';
import * as CartActions from '../../store/actions/cart.actions';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

describe('SkillItem', () => {
  let component: SkillItem;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      dispatch: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: mockStore }],
    });

    component = TestBed.runInInjectionContext(() => new SkillItem());
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize with default values', () => {
    expect(component.added).toBe(false);
    expect(component.showCart).toBe(false);
    expect(component.hoverStars).toBe(false);
    expect(component.skill).toEqual(new SkillDTO());
  });

  it('should have font awesome icons defined', () => {
    expect(component.faStar).toBeDefined();
    expect(component.faCartArrowDown).toBeDefined();
    expect(component.faCheck).toBeDefined();
  });

  it('should dispatch addToCartSuccess action when addToCart is called', () => {
    const testSkill = new SkillDTO();
    testSkill.id = '1';
    testSkill.name = 'Test Skill';

    component.addToCart(testSkill);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CartActions.addToCartSuccess({ skill: testSkill }),
    );
  });

  it('should set added to true after addToCart is called', () => {
    const testSkill = new SkillDTO();
    testSkill.id = '1';
    testSkill.name = 'Test Skill';
    component.addToCart(testSkill);

    expect(component.added).toBe(true);
  });
});
