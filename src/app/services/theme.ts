import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggleTheme() {
    const nextTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
    this.applyTheme(theme);

    if (this.isBrowser) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    if (typeof window.matchMedia !== 'function') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme) {
    const root = this.document.documentElement;
    root.dataset['theme'] = theme;
    root.style.colorScheme = theme;
  }
}
