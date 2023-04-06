type Method = 'post' | 'get' | 'delete'

export function createServerApiConfig(method: Method, cookie: any, controller?: AbortController) {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie,
    },
    signal: controller?.signal,
  }
  return config
}

export function createClientApiConfig(url: string, method: Method, cookie: any, data: any) {
  const config = {
    url: url,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie,
    },
    data: data,
  }
  return config
}

const initialData = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
}

export function createItemLikeApiData<T extends number>(id: T, cookie: any) {
  const apiData = {
    ...initialData,
    id,
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  }
  return apiData
}
