import { TestBed } from '@angular/core/testing';

import { CatalogStoreService } from './catalog-store.service';

const jsonResponse = (body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

describe('CatalogStoreService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('keeps the local catalog when mock mode is configured', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      jsonResponse({ catalogMode: 'mock', apiUrl: 'https://api.example.com/api/v1' }),
    );
    const service = TestBed.inject(CatalogStoreService);

    await service.initialize();

    expect(service.source()).toBe('mock');
    expect(service.snapshot().products.length).toBeGreaterThan(0);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('uses the API catalog when api mode returns a valid contract', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        jsonResponse({ catalogMode: 'api', apiUrl: 'https://api.example.com/api/v1/' }),
      )
      .mockResolvedValueOnce(jsonResponse({ categories: [], products: [], promotions: [] }));
    const service = TestBed.inject(CatalogStoreService);

    await service.initialize();

    expect(service.source()).toBe('api');
    expect(service.snapshot()).toEqual({ categories: [], products: [], promotions: [] });
    expect(fetch).toHaveBeenLastCalledWith('https://api.example.com/api/v1/catalog', {
      headers: { Accept: 'application/json' },
    });
  });

  it('returns to local mocks when the API fails in fallback mode', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        jsonResponse({ catalogMode: 'fallback', apiUrl: 'https://api.example.com/api/v1' }),
      )
      .mockRejectedValueOnce(new Error('API unavailable'));
    const service = TestBed.inject(CatalogStoreService);

    await service.initialize();

    expect(service.source()).toBe('mock');
    expect(service.snapshot().products.length).toBeGreaterThan(0);
    expect(service.error()).toBe('API unavailable');
  });
});
