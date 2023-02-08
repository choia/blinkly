import { RefreshTokenPayload } from './../lib/tokens'
import bcrypt from 'bcrypt'
import db from '../lib/db.js'
import AppError, { isAppError } from '../lib/AppError.js'
import { generateToken, validateToken } from '../lib/tokens.js'
import { User } from '@prisma/client'
interface AuthParams {
  username: string
  password: string
}

const SALT_ROUNDS = 10

class UserService {
  public static instance: UserService

  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async createTokenItem(userId: number) {
    const token = await db.token.create({
      data: {
        userId,
      },
    })
    return token.id
  }

  /* GenerateTokens */
  async generateTokens(user: User, existingTokenId?: number) {
    const { id: userId, username } = user
    const tokenId = existingTokenId ?? (await this.createTokenItem(userId))

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: 1,
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  /* RefreshTokens */
  async refreshTokens(token: string) {
    try {
      const { tokenId } = await validateToken<RefreshTokenPayload>(token)
      const tokenItem = await db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true,
        },
      })
      if (!tokenItem) {
        throw new Error('Token not found')
      }

      return await this.generateTokens(tokenItem.user, tokenId)
    } catch (e) {
      throw new AppError('RefreshTokenError')
    }
  }

  /* Register */
  async register({ username, password }: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (exists) {
      throw new AppError('UserExistsError')
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
    })
    const tokens = await this.generateTokens(user)

    return {
      user,
      tokens,
    }
  }

  /* Login */
  async login({ username, password }: AuthParams) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new AppError('AuthenticationError')
    }

    try {
      const result = await bcrypt.compare(password, user.passwordHash)
      if (!result) {
        throw new AppError('AuthenticationError')
      }
    } catch (e) {
      if (isAppError(e)) {
        throw e
      }
      throw new AppError('UnknownError')
    }

    const tokens = await this.generateTokens(user)

    return {
      user,
      tokens,
    }
  }
}

export default UserService
