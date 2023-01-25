export const offertType = ['COMPRA', 'VENTA'] as const;

export type OfferType = (typeof offertType)[number];
