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

export interface User {
  id: string
  username: string
}

export interface Item {
  id: string
  title: string
  body: string
  link: string
  thumbnail: string | null
  createdAt: string
  updatedAt: string
  user: User
}

export interface CreateItemParams {
  title: string
  content: string
  link: string
  tag?: string[]
}
