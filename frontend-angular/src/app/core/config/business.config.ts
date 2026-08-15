export interface BusinessConfig {
  readonly name: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
    readonly address: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly mapEmbedUrl: string;
    readonly directionsUrl: string;
  };
  readonly hours: readonly {
    readonly days: string;
    readonly opensAt: string;
    readonly closesAt: string;
  }[];
  readonly serviceModes: readonly string[];
  readonly phones: readonly {
    readonly display: string;
    readonly international: string;
  }[];
  readonly socialHandles: {
    readonly instagram: string;
    readonly tiktok: string;
  };
  readonly socialUrls: {
    readonly instagram: string;
    readonly facebook: string;
    readonly tiktok: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'Pollos Misión',
  location: {
    city: 'La Paz',
    country: 'Bolivia',
    address: 'Zona Mallasa, Av. Principal entre calles 4 y 5, N.º 4305',
    latitude: -16.56890322663596,
    longitude: -68.0868558137452,
    mapEmbedUrl:
      'https://www.google.com/maps?q=-16.56890322663596,-68.0868558137452&z=17&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=-16.56890322663596,-68.0868558137452',
  },
  hours: [{ days: 'Lunes a Viernes', opensAt: '18:00', closesAt: '23:00' }],
  serviceModes: ['Delivery', 'Atención en food truck'],
  phones: [
    { display: '77632194', international: '59177632194' },
    { display: '60514138', international: '59160514138' },
  ],
  socialHandles: {
    instagram: 'pollosmision',
    tiktok: 'pollosmision',
  },
  socialUrls: {
    instagram: 'https://www.instagram.com/pollosmision',
    facebook: 'https://www.facebook.com/profile.php?id=61585468384758',
    tiktok: 'https://www.tiktok.com/@pollosmision',
  },
};
