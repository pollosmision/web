import { Injectable, signal } from '@angular/core';

export type CatalogMode = 'mock' | 'api' | 'fallback';

export interface RuntimeConfig {
  readonly catalogMode: CatalogMode;
  readonly apiUrl: string;
}

const DEFAULT_CONFIG: RuntimeConfig = {
  catalogMode: 'mock',
  apiUrl: 'http://localhost:3000/api/v1',
};

const isCatalogMode = (value: unknown): value is CatalogMode =>
  value === 'mock' || value === 'api' || value === 'fallback';

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private readonly configState = signal<RuntimeConfig>(DEFAULT_CONFIG);

  readonly config = this.configState.asReadonly();

  async load(): Promise<void> {
    try {
      const response = await fetch('config/app-config.json', { cache: 'no-store' });
      if (!response.ok) return;

      const candidate = (await response.json()) as Partial<RuntimeConfig>;
      this.configState.set({
        catalogMode: isCatalogMode(candidate.catalogMode)
          ? candidate.catalogMode
          : DEFAULT_CONFIG.catalogMode,
        apiUrl:
          typeof candidate.apiUrl === 'string' && candidate.apiUrl.trim()
            ? candidate.apiUrl.replace(/\/$/, '')
            : DEFAULT_CONFIG.apiUrl,
      });
    } catch {
      // The bundled mock configuration keeps the storefront available.
    }
  }
}
