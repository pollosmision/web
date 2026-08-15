import { Injectable, inject, signal } from '@angular/core';

import { RuntimeConfigService } from '../../config/runtime-config.service';
import { PROMOTION_MOCK } from '../../content/data/promotion.mock';
import { CATEGORY_MOCK } from '../data/category.mock';
import { PRODUCT_MOCK } from '../data/product.mock';
import { CatalogSnapshot } from '../models/catalog-snapshot.model';

const MOCK_CATALOG: CatalogSnapshot = {
  categories: CATEGORY_MOCK,
  products: PRODUCT_MOCK,
  promotions: PROMOTION_MOCK,
};

const isCatalogSnapshot = (value: unknown): value is CatalogSnapshot => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<CatalogSnapshot>;
  return (
    Array.isArray(candidate.categories) &&
    Array.isArray(candidate.products) &&
    Array.isArray(candidate.promotions)
  );
};

@Injectable({ providedIn: 'root' })
export class CatalogStoreService {
  private readonly runtimeConfig = inject(RuntimeConfigService);
  private readonly snapshotState = signal<CatalogSnapshot>(MOCK_CATALOG);
  private readonly sourceState = signal<'mock' | 'api'>('mock');
  private readonly errorState = signal<string | null>(null);

  readonly snapshot = this.snapshotState.asReadonly();
  readonly source = this.sourceState.asReadonly();
  readonly error = this.errorState.asReadonly();

  async initialize(): Promise<void> {
    await this.runtimeConfig.load();
    const { catalogMode } = this.runtimeConfig.config();

    if (catalogMode === 'mock') return;

    try {
      const catalog = await this.loadFromApi();
      this.snapshotState.set(catalog);
      this.sourceState.set('api');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo cargar el catálogo.';
      this.errorState.set(message);

      if (catalogMode === 'api') throw error;

      this.snapshotState.set(MOCK_CATALOG);
      this.sourceState.set('mock');
    }
  }

  private async loadFromApi(): Promise<CatalogSnapshot> {
    const response = await fetch(`${this.runtimeConfig.config().apiUrl}/catalog`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`La API del catálogo respondió con estado ${response.status}.`);
    }

    const catalog: unknown = await response.json();
    if (!isCatalogSnapshot(catalog)) {
      throw new Error('La respuesta de la API no cumple el contrato del catálogo.');
    }

    return catalog;
  }
}
