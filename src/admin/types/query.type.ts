const queryParams = [undefined, 'user', 'offer'] as const;

type QueryType = (typeof queryParams)[number];

export function isValidQuery(value: any): value is QueryType {
  return queryParams.includes(value);
}
