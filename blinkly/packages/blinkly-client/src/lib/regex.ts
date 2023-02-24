/**
 * username should be 5~20 alphanumeric characters
 */
export function isValidUsername(username: string) {
  return /^[a-z0-9]{5,20}$/.test(username)
}

/**
 * password should be more than or equal to 8 characters and contains at least two types of alphabet, number, or special character
 */
export function isValidPassword(password: string) {
  const passwordRules = [/[a-zA-Z]/, /[0-9]/, /[^A-Za-z0-9]/]
  if (password.length < 0) return false
  const counter = passwordRules.reduce((acc, current) => {
    if (current.test(password)) {
      acc += 1
    }
    return acc
  }, 0)
  return counter > 1
}
