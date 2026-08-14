import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

function mockSystemTheme(prefersDark: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: () => ({
      matches: prefersDark,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => true,
    }),
  });
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });

  it('uses the system preference when no theme was saved', () => {
    mockSystemTheme(true);

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('prioritizes a saved preference over the system preference', () => {
    mockSystemTheme(true);
    localStorage.setItem('pollos-mision-theme', 'light');

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('toggles and persists the selected theme', () => {
    mockSystemTheme(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('pollos-mision-theme')).toBe('dark');
  });
});
