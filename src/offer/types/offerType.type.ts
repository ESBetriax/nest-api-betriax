export const offertType = ['BUY', 'SELL'] as const;

export type OfferType = (typeof offertType)[number];
