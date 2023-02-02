import db from '../lib/db.js'
import bcrypt from 'bcrypt'
import AppError from '../lib/AppError.js'
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

  async register({ username, password }: AuthParams) {
    const exists = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (exists) {
      // throw new Error('User already exists')
      throw new AppError('UserExistsError')
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
    })
    return user
  }

  login() {
    return 'login!!'
  }
}

export default UserService
