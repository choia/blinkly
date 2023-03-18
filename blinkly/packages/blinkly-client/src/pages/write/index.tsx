import BasicTemplate from '@/components/templates/basicTemplate'
import Button from '@/components/common/button'

import { useRouter } from 'next/router'
import WriteFormTemplate from '@/components/layouts/write/writeFormTemplate'
import { FormEvent, useState } from 'react'
import LabelInput from '@/components/common/labelInput'
import { useWriteContext } from '@/contexts/writeContext'

const Write = () => {
  const router = useRouter()
  const { state, actions } = useWriteContext()
  const [link, setLink] = useState(state.link)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    actions.setLink(link)
    router.push('/write/intro')
  }

  return (
    <BasicTemplate title="Enter a Link" hasBackButton>
      <WriteFormTemplate
        description="Enter a URL that you like to share!"
        buttonText="Next"
        onSubmit={onSubmit}
      >
        <LabelInput
          label="URL"
          placeholder="https://example.com"
          name="link"
          // value={link}
          defaultValue={state.link}
          onChange={(e) => setLink(e.target.value)}
        ></LabelInput>
      </WriteFormTemplate>
    </BasicTemplate>
  )
}

export default Write
