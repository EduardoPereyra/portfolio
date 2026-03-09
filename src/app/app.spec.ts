import { describe, it, expect } from 'vitest';
import { App } from './app';

describe('App', () => {
  it('should create the app component', () => {
    const app = new App();
    expect(app).toBeDefined();
  });

  it('should have title signal with value "portfolio"', () => {
    const app = new App();
    expect(app['title']()).toBe('portfolio');
  });
});
