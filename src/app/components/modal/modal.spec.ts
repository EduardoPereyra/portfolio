import { describe, it, expect, vi } from 'vitest';
import { Modal } from './modal';

describe('Modal', () => {
  it('should create', () => {
    const modal = new Modal();
    expect(modal).toBeDefined();
  });

  it('should initialize imageName with empty string', () => {
    const modal = new Modal();
    expect(modal.imageName).toBe('');
  });

  it('should set imageName from input', () => {
    const modal = new Modal();
    modal.imageName = 'test-image.jpg';
    expect(modal.imageName).toBe('test-image.jpg');
  });

  it('should emit onClose event when onClick is called', () => {
    const modal = new Modal();
    const emitSpy = vi.spyOn(modal.onClose, 'emit');

    modal.onClick();

    expect(emitSpy).toHaveBeenCalledWith();
  });

  it('should emit onClose without value', () => {
    const modal = new Modal();
    let emitted = false;

    modal.onClose.subscribe(() => {
      emitted = true;
    });

    modal.onClick();

    expect(emitted).toBe(true);
  });
});
