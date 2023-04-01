import { ItemStatProvider } from '@/contexts/itemStatContext'
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
          <ItemStatProvider>
            <Component {...pageProps} />
          </ItemStatProvider>
        </WriteProvider>
      </UserContext.Provider>
    </>
  )
}
