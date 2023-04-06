import { ItemOverrideProvider } from '@/contexts/itemOverrideContext'
import { UserContext, useUser } from '@/contexts/userContext'
import { WriteProvider } from '@/contexts/writeContext'
import '@/styles/globals.css'
import { GlobalStyles } from '@/styles/globalStyles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const data = useUser()
  // console.log(data)
  return (
    <>
      <GlobalStyles />
      <UserContext.Provider value={data}>
        <WriteProvider>
          <ItemOverrideProvider>
            <Component {...pageProps} />
          </ItemOverrideProvider>
        </WriteProvider>
      </UserContext.Provider>
    </>
  )
}
