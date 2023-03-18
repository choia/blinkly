import axios, { AxiosResponse } from 'axios'
import BasicTemplate from '@/components/templates/basicTemplate'
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

function Intro({ cookies }) {
  const router = useRouter()

  const {
    state: { link },
    actions,
  } = useWriteContext()

  const [form, setForm] = useState({
    title: '',
    body: '',
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cookie = cookies['access_token']

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const body = formData.get('body') as string
    const data = {
      title,
      body,
      link,
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
      console.log('7777777', response)
      router.push('/')
    } catch (e: any) {
      console.log(e)
    }
  }
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name
    const { value } = e.target
    setForm({
      ...form,
      [key]: value,
    })
  }

  return (
    <BasicTemplate title="Intro" hasBackButton>
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
        </Group>
      </WriteFormTemplate>
    </BasicTemplate>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { req } = context
  const cookies = req.cookies

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

export default Intro
