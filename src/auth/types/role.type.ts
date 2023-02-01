export const roleList = ['PERSON', 'ADMIN'] as const;

export type Role = (typeof roleList)[number];
