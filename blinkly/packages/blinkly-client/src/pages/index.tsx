import Head from 'next/head'
import styled from 'styled-components'
import FullHeightPage from '@/components/common/fullHeightPage'
import Header from '@/components/layouts/header/header'
import Footer from '@/components/layouts/footer/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Blinkly</title>
        <meta name="description" content="Blinkly App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullHeightPage>
        <Header />
        <Content />
        <Footer />
      </FullHeightPage>
    </>
  )
}

const Content = styled.div`
  flex: 1;
`
