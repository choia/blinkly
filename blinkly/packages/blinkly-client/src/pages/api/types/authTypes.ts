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
