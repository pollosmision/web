export interface BusinessConfig {
  readonly name: string;
  readonly location: {
    readonly city: string;
    readonly country: string;
  };
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
  },
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
