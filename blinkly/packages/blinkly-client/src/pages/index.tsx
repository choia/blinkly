import styled from 'styled-components'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWriteContext } from '@/contexts/writeContext'
import { client } from '@/lib/client'
import LinkCardList from '@/components/layouts/home/linkCardList'
import TabLayout from '@/components/templates/tabLayout'
import type { InferGetStaticPropsType } from 'next'
import { GetItemResult } from './api/types'

export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <StyledTabLayout>
        <LinkCardList items={data.list}></LinkCardList>
      </StyledTabLayout>
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

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`
