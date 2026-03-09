import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;

  beforeEach(() => {
    component = new Footer();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should set currentYear to the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should update currentYear when instantiated in a different year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01'));

    const newComponent = new Footer();
    expect(newComponent.currentYear).toBe(2025);

    vi.useRealTimers();
  });
});
