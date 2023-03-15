import BasicTemplate from '@/components/templates/basicTemplate'
import Button from '@/components/common/button'

import { useRouter } from 'next/router'
import WriteFormTemplate from '@/components/layouts/write/writeFormTemplate'
import { FormEvent } from 'react'
import LabelInput from '@/components/common/labelInput'
import { useWriteContext } from '@/contexts/writeContext'

const Write = () => {
  const router = useRouter()
  const { state, actions } = useWriteContext()

  const onProceed = () => {
    router.push('/write/intro')
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get('url') as string
    actions.setUrl(url)
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
          name="url"
          defaultValue={state.url}
        ></LabelInput>
      </WriteFormTemplate>

      {/* <Button onClick={onProceed}>Next</Button> */}
    </BasicTemplate>
  )
}

export default Write
