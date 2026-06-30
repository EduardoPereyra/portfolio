import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from './theme';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('style');
    vi.restoreAllMocks();
  });

  it('should initialize from localStorage', () => {
    localStorage.setItem('portfolio-theme', 'dark');
    const service = createService();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('should toggle and persist the selected theme', () => {
    const service = createService();

    service.setTheme('light');
    service.toggleTheme();

    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('should use the system preference when no stored theme exists', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));

    const service = createService();

    expect(service.theme()).toBe('dark');
  });
});

function createService() {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      ThemeService,
      { provide: DOCUMENT, useValue: document },
      { provide: PLATFORM_ID, useValue: 'browser' },
    ],
  });

  return TestBed.inject(ThemeService);
}
