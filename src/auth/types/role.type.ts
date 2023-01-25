export const roleList = ['PERSON', 'COMPANY', 'ADMIN'] as const;

export type Role = (typeof roleList)[number];
