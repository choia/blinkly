import Head from 'next/head'
import styled from 'styled-components'
import FullHeightPage from '@/components/common/fullHeightPage'
import Header from '@/components/layouts/header/header'
import Footer from '@/components/layouts/footer/footer'
import { useWriteContext } from '@/contexts/writeContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { client } from '@/lib/client'
import { GetItemResult } from './api/types'

export default function Home({ data }) {
  console.log(data)
  // const { userData } = useUserContext()
  // console.log('@idnex', userData)
  const { state, actions } = useWriteContext()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/' && state.form.link !== '') {
      actions.reset()
    }
  }, [state, actions, router.pathname])

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

export async function getStaticProps() {
  const url = 'http://localhost:8080/api/items'

  const response = await client.get<GetItemResult>(url)

  return {
    props: {
      data: response.data,
    },
  }
}

// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   }
// }

const Content = styled.div`
  flex: 1;
`
