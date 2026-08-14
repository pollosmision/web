import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ColorTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'pollos-mision-theme';
const DARK_THEME_QUERY = '(prefers-color-scheme: dark)';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mediaQuery = isPlatformBrowser(this.platformId)
    ? window.matchMedia(DARK_THEME_QUERY)
    : null;
  private followsSystemTheme = true;

  readonly theme = signal<ColorTheme>('light');

  constructor() {
    const savedTheme = this.readSavedTheme();
    this.followsSystemTheme = savedTheme === null;
    this.applyTheme(savedTheme ?? this.systemTheme());

    if (!savedTheme && this.mediaQuery) {
      const followSystemTheme = (event: MediaQueryListEvent): void => {
        if (!this.followsSystemTheme) return;
        this.applyTheme(event.matches ? 'dark' : 'light');
      };

      this.mediaQuery.addEventListener('change', followSystemTheme);
      this.destroyRef.onDestroy(() =>
        this.mediaQuery?.removeEventListener('change', followSystemTheme),
      );
    }
  }

  toggle(): void {
    const nextTheme: ColorTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.followsSystemTheme = false;
    this.applyTheme(nextTheme);
    this.saveTheme(nextTheme);
  }

  private systemTheme(): ColorTheme {
    return this.mediaQuery?.matches ? 'dark' : 'light';
  }

  private applyTheme(theme: ColorTheme): void {
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
  }

  private readSavedTheme(): ColorTheme | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
    } catch {
      return null;
    }
  }

  private saveTheme(theme: ColorTheme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The selected theme still applies during this visit when storage is unavailable.
    }
  }
}
