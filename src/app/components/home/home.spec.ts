import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Home } from './home';
import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('Home', () => {
  let component: Home;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      get: vi.fn(),
    };

    component = TestBed.runInInjectionContext(() => new Home());
    component['http'] = httpClientMock;
  });

  describe('ngOnInit', () => {
    it('should call importAllImages on init', () => {
      // Setup the mock BEFORE spying
      httpClientMock.get.mockReturnValue(of([]));

      const importSpy = vi.spyOn(component, 'importAllImages');
      component.ngOnInit();
      expect(importSpy).toHaveBeenCalled();
    });
  });

  describe('importAllImages', () => {
    it('should load images from certificates.json and set images signal', async () => {
      const mockImages = ['cert1.png', 'cert2.png', 'cert3.png'];
      httpClientMock.get.mockReturnValue(of(mockImages));

      component.importAllImages();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/certificates/certificates.json');
      expect(component.images()).toEqual(mockImages);
    });

    it('should handle error when loading images fails', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockError = new Error('Network error');
      httpClientMock.get.mockReturnValue(throwError(() => mockError));

      component.importAllImages();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(consoleErrorSpy).toHaveBeenCalledWith('Could not load image list:', mockError);
      expect(component.images()).toEqual([]);
      consoleErrorSpy.mockRestore();
    });
  });

  describe('signals', () => {
    it('should initialize images signal as empty array', () => {
      expect(component.images()).toEqual([]);
    });

    it('should initialize selectedCertificate signal as null', () => {
      expect(component.selectedCertificate()).toBeNull();
    });

    it('should initialize lampsOn signal as false', () => {
      expect(component.lampsOn()).toBe(false);
    });
  });
});
