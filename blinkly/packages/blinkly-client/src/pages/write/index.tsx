import BasicLayout from '@/components/templates/basicLayout'
import Button from '@/components/common/button'

import { useRouter } from 'next/router'
import WriteFormTemplate from '@/components/layouts/write/writeFormTemplate'
import { FormEvent, useState } from 'react'
import LabelInput from '@/components/common/labelInput'
import { useWriteContext } from '@/contexts/writeContext'
import { checkIsLoggedIn } from '@/lib/protectRoute'
import { NextPageContext } from 'next'
import { applyAuth } from '@/lib/applyAuth'

const Write = () => {
  const router = useRouter()
  const { state, actions } = useWriteContext()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/write/intro')
  }

  return (
    <BasicLayout title="Enter a Link" hasBackButton>
      <WriteFormTemplate
        description="Enter a URL that you like to share!"
        buttonText="Next"
        onSubmit={onSubmit}
      >
        <LabelInput
          label="URL"
          placeholder="https://example.com"
          name="link"
          value={state.form.link}
          onChange={(e) => actions.change('link', e.target.value)}
          errorMessage={state.error?.statusCode === 422 ? 'Incorrect URL' : undefined}
        ></LabelInput>
      </WriteFormTemplate>
    </BasicLayout>
  )
}

// export async function getServerSideProps(context: NextPageContext) {
//   const { req } = context
//   const applied = applyAuth(req)
//   if (!applied) {
//     throw new Error('Not logged in')
//   }

//   console.log('12121212', req)

//   return {
//     props: {},
//   }
// }

export default Write
