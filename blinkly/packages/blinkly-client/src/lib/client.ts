import axios from 'axios'

// let _cookie = ''

export const client = axios.create()
client.defaults.baseURL = 'http://localhost:8080'
client.defaults.withCredentials = true

export function setClientCookie(cookie: string) {
  // _cookie = cookie
  console.log('5555 at client.ts', cookie)
  client.defaults.headers.common['Cookie'] = cookie
}

export function deleteClientCookie() {
  delete client.defaults.headers.common['Cookie']
}
// export function getClientCookie() {
//   return _cookie
// }

// export function clearCookie() {
//   _cookie = ''
// }

// export function consumeCookie(req: NextApiRequest) {
//   const cookie = req.cookies['access_token']
//   if (cookie) {
//     setClientCookie(cookie)
//   }
// }
