export const queryKey = {
  POPULAR_SIDES: 'popularSides',
  JOINED_SIDES: 'joinedSides',
} as const

export type QueryKey = (typeof queryKey)[keyof typeof queryKey]
