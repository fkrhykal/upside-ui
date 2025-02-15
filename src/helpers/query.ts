export const queryKey = {
  POSTS: 'posts',
  POPULAR_SIDES: 'popularSides',
  JOINED_SIDES: 'joinedSides',
  SUBSCRIBED_POSTS: 'subscribedPosts',
  LATEST_POSTS: 'latestPost',
} as const

export type QueryKey = (typeof queryKey)[keyof typeof queryKey]
