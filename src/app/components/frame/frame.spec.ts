import { describe, it, expect, vi } from 'vitest';
import { Frame } from './frame';

describe('Frame', () => {
  it('should create an instance', () => {
    const component = new Frame();
    expect(component).toBeTruthy();
  });

  it('should initialize imageName as empty string', () => {
    const component = new Frame();
    expect(component.imageName).toBe('');
  });

  it('should emit selectedCertificate with imageName on onClick', () => {
    const component = new Frame();
    component.imageName = 'test-image.png';

    const emitSpy = vi.spyOn(component.selectedCertificate, 'emit');
    component.onClick();

    expect(emitSpy).toHaveBeenCalledWith('test-image.png');
  });

  it('should emit selectedCertificate with correct value when imageName changes', () => {
    const component = new Frame();
    component.imageName = 'certificate-1.jpg';

    const emitSpy = vi.spyOn(component.selectedCertificate, 'emit');
    component.onClick();

    expect(emitSpy).toHaveBeenCalledWith('certificate-1.jpg');
  });

  it('should emit empty string when imageName is not set', () => {
    const component = new Frame();

    const emitSpy = vi.spyOn(component.selectedCertificate, 'emit');
    component.onClick();

    expect(emitSpy).toHaveBeenCalledWith('');
  });
});
