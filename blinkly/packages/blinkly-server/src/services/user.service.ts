import db from '../lib/db.js'
import bcrypt from 'bcrypt'
import AppError from '../lib/AppError.js'
import { generateToken } from '../lib/tokens.js'
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

  async generateTokens(userId: number, username: string) {
    // const accessToken = await generateToken({
    //   type: 'access_token',
    //   userId,
    //   tokenId: 1,
    //   username: username,
    // })

    // const refreshToken = await generateToken({
    //   type: 'refresh_token',
    //   tokenId: 1,
    //   rotationCounter: 1,
    // })

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId: 1,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId: 1,
        rotationCounter: 1,
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

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
    const tokens = await this.generateTokens(user.id, username)

    return {
      user,
      tokens,
    }
  }

  login() {
    return 'login!!'
  }
}

export default UserService
