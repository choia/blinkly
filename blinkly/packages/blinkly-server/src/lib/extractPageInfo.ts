import axios from 'axios'
import AppError from './AppError.js'
import metascraper from 'metascraper'
import logoRule from 'metascraper-logo-favicon'
import publisherRule from 'metascraper-publisher'
import authorRule from 'metascraper-author'
import imageRule from 'metascraper-image'

interface ValidateUrlResult {
  url: string
  html: string
}

interface ExtractPageInfoResult {
  url: string
  publisher: string
  favicon: string | null
  author: string | null
  thumbnail: string | null
  domain: string
}

const client = axios.create({
  timeout: 8000,
})

const scraper = metascraper([
  logoRule(),
  publisherRule(),
  authorRule(),
  imageRule(),
])

export async function extractPageInfo(
  url: string,
): Promise<ExtractPageInfoResult> {
  const { url: validatedUrl, html } = await validateUrl(url)
  const data = await scraper({
    html,
    url: validatedUrl,
  })

  const domain = new URL(validatedUrl).hostname

  return {
    url: validatedUrl,
    author: data.author,
    favicon: data.logo,
    publisher: data.publisher ?? domain,
    thumbnail: data.image,
    domain,
  }
}

export async function validateUrl(url: string): Promise<ValidateUrlResult> {
  const hasProtocol = /^https?:\/\//.test(url)

  if (hasProtocol) {
    try {
      const response = await client.get(url)
      return {
        url,
        html: response.data,
      }
    } catch (e) {
      throw new AppError('InvalidUrlError')
    }
  }

  const withHttp = `http://${url}`
  const withHttps = `https://${url}`
  const [http, https] = await Promise.allSettled([
    client.get(withHttp),
    client.get(withHttps),
  ])

  if (https.status === 'fulfilled') {
    return {
      url: withHttps,
      html: https.value.data,
    }
  }
  if (http.status === 'fulfilled') {
    return {
      url: withHttp,
      html: http.value.data,
    }
  }

  throw new AppError('InvalidUrlError')
}
