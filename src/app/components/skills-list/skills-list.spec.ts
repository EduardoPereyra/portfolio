import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SkillsList } from './skills-list';
import { Skills } from '../../services/skills';
import { ExperienceLevel, SkillDTO } from '../../models/skill';
import { signal } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';

describe('SkillsList', () => {
  let component: SkillsList;
  let skillsService: {
    getSkills: ReturnType<typeof vi.fn>;
    cart: ReturnType<typeof signal>;
    addSkillToCart: ReturnType<typeof vi.fn>;
  };
  let activatedRoute: any;
  let queryParamMap$: BehaviorSubject<any>;

  const mockSkills: SkillDTO[] = [
    {
      id: '1',
      name: 'Angular',
      categories: ['Frontend', 'Framework'],
      img: '',
      description: '',
      experience: ExperienceLevel.EXPERT,
      level: 0,
    },
    {
      id: '2',
      name: 'TypeScript',
      categories: ['Language'],
      img: '',
      description: '',
      experience: ExperienceLevel.INTERMEDIATE,
      level: 0,
    },
    {
      id: '3',
      name: 'React',
      categories: ['Frontend', 'Framework'],
      img: '',
      description: '',
      experience: ExperienceLevel.BEGINNER,
      level: 0,
    },
  ];

  beforeEach(() => {
    queryParamMap$ = new BehaviorSubject(convertToParamMap({ search: '' }));

    skillsService = {
      getSkills: vi.fn().mockReturnValue(of(mockSkills)),
      cart: signal([]),
      addSkillToCart: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Skills, useValue: skillsService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamMap$.asObservable(),
            snapshot: { queryParamMap: convertToParamMap({ search: '' }) },
          },
        },
      ],
    });
    component = TestBed.runInInjectionContext(() => new SkillsList());
    component.skillsService = skillsService as any;
    activatedRoute = TestBed.inject(ActivatedRoute);
    component['route'] = activatedRoute;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize signals on ngOnInit', () => {
    component.ngOnInit();
    expect(component.items()).toEqual(mockSkills);
    expect(component.filteredItems()).toEqual(mockSkills);
  });

  it('should extract unique categories and sort them', () => {
    component.ngOnInit();
    expect(component.categories()).toEqual(['Framework', 'Frontend', 'Language']);
  });

  it('should filter items by category', () => {
    component.ngOnInit();
    component.setFilter('Frontend');
    expect(component.filter()).toBe('Frontend');
    expect(component.filteredItems().length).toBe(2);
  });

  it('should clear filter when clicking same category', () => {
    component.ngOnInit();
    component.setFilter('Frontend');
    component.setFilter('Frontend');
    expect(component.filter()).toBe('');
    expect(component.filteredItems()).toEqual(mockSkills);
  });

  it('should search skills by name', () => {
    activatedRoute.queryParamMap = of(new Map([['search', 'angular']]));
    component.ngOnInit();
    expect(component.searchValue()).toBe('angular');
    expect(component.filteredItems().length).toBe(1);
    expect(component.filteredItems()[0].name).toBe('Angular');
  });

  it('should handle case-insensitive search', () => {
    queryParamMap$.next(convertToParamMap({ search: 'TYPESCRIPT' }));
    component.ngOnInit();
    expect(component.filteredItems().length).toBe(1);
    expect(component.filteredItems()[0].name).toBe('TypeScript');
  });
});
