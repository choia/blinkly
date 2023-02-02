import db from '../lib/db.js'
import bcrypt from 'bcrypt'
interface AuthParam {
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

  async register({ username, password }: AuthParam) {
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
