import axios from 'axios'
import BasicLayout from '@/components/templates/basicLayout'
import WriteFormTemplate from '@/components/layouts/write/writeFormTemplate'
import { ChangeEvent, FormEvent, useState } from 'react'
import styled from 'styled-components'
import LabelInput from '@/components/common/labelInput'
import LabelTextArea from '@/components/common/labelTextArea'
import { useWriteContext } from '@/contexts/writeContext'
import { PostApiConfig } from '@/lib/apiConfig'
import { applyAuth } from '@/lib/applyAuth'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextPageContext } from 'next/types'
import { useRouter } from 'next/router'
import { extractError } from '@/lib/error'
import type { InferGetStaticPropsType } from 'next'

function Intro({ cookies }: InferGetStaticPropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const {
    state: { form },
    actions,
  } = useWriteContext()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cookie = cookies['access_token']

    if (form.title === '' || form.body === '') {
      setErrorMessage('Please enter both title and content.')
      return
    }
    console.log('1111intro', cookie)
    const data = {
      title: form.title,
      body: form.body,
      link: form.link,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie}`,
      },
    }

    // const config = PostApiConfig('/api/item', cookie, JSON.stringify(data), )
    const config = {
      url: '/api/item',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie,
      },

      data: data,
    }

    try {
      const response = await axios(config)

      router.push('/')
    } catch (e: any) {
      // console.log('hello', e.response.data)
      const errorData = e.response.data
      if (errorData.statusCode === 422) {
        actions.setError(errorData)
        router.push('/write/')
      }
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as 'title' | 'link' | 'body'
    const { value } = e.target
    actions.change(key, value)
  }

  return (
    <BasicLayout title="Intro" hasBackButton>
      <WriteFormTemplate
        description="Enter news you like to share"
        buttonText="Register"
        onSubmit={onSubmit}
      >
        <Group>
          <LabelInput
            label="Title"
            name="title"
            value={form.title}
            onChange={onChange}
          ></LabelInput>
          <StyledLabelTextArea
            label="Content"
            name="body"
            value={form.body}
            onChange={onChange}
          ></StyledLabelTextArea>
          {errorMessage ? <Message>{errorMessage}</Message> : null}
        </Group>
      </WriteFormTemplate>
    </BasicLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { req } = context
  const cookies = req?.cookies

  return {
    props: {
      cookies,
    },
  }
}

const Group = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
`

const StyledLabelTextArea = styled(LabelTextArea)`
  flex: 1;
  textarea {
    flex: 1;
    resize: none;
    font-family: inherit;
  }
`

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  text-align: center;
`

export default Intro
