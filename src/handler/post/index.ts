export type Post = {
  id: string
  body: string
  createdAt: number
  updatedAt: number
  side: {
    id: string
    nick: string
  }
  author: {
    id: string
    username: string
  }
}
