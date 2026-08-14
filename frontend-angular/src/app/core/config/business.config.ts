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
    readonly facebook: string | null;
    readonly tiktok: string | null;
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
    facebook: null,
    tiktok: null,
  },
};
