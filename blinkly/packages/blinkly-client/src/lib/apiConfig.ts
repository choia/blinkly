// type Method = 'POST' | 'GET'

interface ApiConfigType {
  method: string
  url?: string
  headers: Record<string, string>
  data?: Record<any, string>
}

const postConfigDefault: ApiConfigType = {
  method: 'Post',
  headers: { 'Content-Type': 'application/json' },
}

export function PostApiConfig(url: string, cookie: string, data?: any) {
  return {
    ...postConfigDefault,
    url: url,
    data: data,
    headers: { Authorization: `Bearer ${cookie}` },
  }
}

/*
  Authorization: `Bearer ${req.cookies['access_token']}`,
  withCredentials: withCredentials,
*/
