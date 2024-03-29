import qs from 'qs'
import styled from 'styled-components'
import { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useWriteContext } from '@/contexts/writeContext'
import { client, setClientCookie } from '@/lib/client'
import LinkCardList from '@/components/layouts/home/linkCardList'
import TabLayout from '@/components/templates/tabLayout'
import { GetItemResult } from './api/types'
import type { InferGetStaticPropsType } from 'next'
import axios from 'axios'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

// interface QueryProps {
//   query: {
//     cursor: string
//   },
// }

export default function Home({
  data,
  cookies,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { state, actions } = useWriteContext()
  const [itemData, setItemData] = useState()
  const [pages, setPages] = useState([data])

  const ref = useRef<HTMLDivElement>(null)
  setClientCookie(cookies)

  const fetchNext = useCallback(async () => {
    const { hasNextPage, endCursor } = pages.at(-1)?.pageInfo ?? {
      endCursor: null,
      hasNextPage: false,
    }

    if (!hasNextPage) return

    const res = await axios.get('api/item', {
      params: { endCursor },
    })

    setItemData(res.data)
  }, [pages])

  useEffect(() => {
    if (!itemData) return
    if (pages.includes(itemData)) return
    setPages(pages.concat(itemData))
  }, [pages, data, itemData])

  useInfiniteScroll(ref, fetchNext)

  useEffect(() => {
    if (router.pathname === '/' && state.form.link !== '') {
      actions.reset()
    }
  }, [state, actions, router.pathname])

  const items = pages.flatMap((page) => page.list)

  return (
    <>
      <Head>
        <title>Blinkly</title>
        <meta name="description" content="Blinkly App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledTabLayout>
        <LinkCardList items={items} cookies={cookies}></LinkCardList>

        <div ref={ref}></div>
      </StyledTabLayout>
    </>
  )
}

export async function getServerSideProps({ query, req }) {
  const { cursor } = query

  const parsedCursor = cursor !== undefined ? parseInt(cursor, 10) : undefined
  const url = 'http://localhost:8080/api/items'

  const response = await client.get<GetItemResult>(
    url.concat(
      qs.stringify(
        { cursor: parsedCursor },
        {
          addQueryPrefix: true,
        },
      ),
    ),
  )

  return {
    props: {
      data: response.data,
      cookies: req.cookies,
    },
  }
}

const StyledTabLayout = styled(TabLayout)`
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`
