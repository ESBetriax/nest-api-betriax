export const statusList = [
  'PENDING',
  'TAKEN',
  'A-OK',
  'B-OK',
  'CLOSED',
  'NOT TAKEN',
  'DEACTIVATED',
  'FOR ABANDONED',
  'ABANDONED',
  'REIMBURSED',
] as const;

export type status = (typeof statusList)[number];
