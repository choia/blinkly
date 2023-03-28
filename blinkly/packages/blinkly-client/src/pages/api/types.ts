export interface GetItemResult {
  list: Item[]
  totalCount: number
  pageInfo: PageInfo
}

export interface Item {
  id: string
  title: string
  body: string
  link: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  author: string
  user: User
  publisher: Publisher
}

export interface Publisher {
  id: number
  name: string
  favicon: string | null
  domain: string
}

export interface User {
  id: number
  username: string
}

export interface PageInfo {
  endCursor: number | null
  hasNextPage: boolean
}

export interface AuthParams {
  username: string
  password: string
}

export interface AuthResult {
  user: User
  tokens: Tokens
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}
export interface CreateItemParams {
  title: string
  content: string
  link: string
  tag?: string[]
}
