import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Skills } from './skills';
import { ExperienceLevel, SkillDTO } from '../models/skill';
import { firstValueFrom } from 'rxjs';

describe('Skills Service', () => {
  let service: Skills;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(Skills);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch skills from JSON file', async () => {
    const mockSkills: SkillDTO[] = [
      {
        id: '1',
        name: 'TypeScript',
        img: '',
        description: '',
        experience: ExperienceLevel.BEGINNER,
        level: 0,
        categories: [],
      },
      {
        id: '2',
        name: 'Angular',
        img: '',
        description: '',
        experience: ExperienceLevel.BEGINNER,
        level: 0,
        categories: [],
      },
    ];

    const skillsPromise = firstValueFrom(service.getSkills());

    const req = httpMock.expectOne('../assets/json/skills.json');
    expect(req.request.method).toBe('GET');
    req.flush({ skills: mockSkills });

    const skills = await skillsPromise;
    expect(skills).toEqual(mockSkills);
  });

  it('should add skill to cart', () => {
    const skill: SkillDTO = {
      id: '1',
      name: 'TypeScript',
      img: '',
      description: '',
      experience: ExperienceLevel.BEGINNER,
      level: 0,
      categories: [],
    };
    service.addSkillToCart(skill);

    expect(service['cart']).toContain(skill);
    expect(service['cart'].length).toBe(1);
  });

  it('should not add duplicate skill to cart', () => {
    const skill: SkillDTO = {
      id: '1',
      name: 'TypeScript',
      img: '',
      description: '',
      experience: ExperienceLevel.BEGINNER,
      level: 0,
      categories: [],
    } as SkillDTO;
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    service.addSkillToCart(skill);
    service.addSkillToCart(skill);

    expect(service['cart'].length).toBe(1);
    expect(alertSpy).toHaveBeenCalledWith('Skill already in cart');
    alertSpy.mockRestore();
  });

  it('should verify cart is empty initially', () => {
    expect(service['cart'].length).toBe(0);
  });
});
