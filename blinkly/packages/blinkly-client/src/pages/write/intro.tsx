import BasicTemplate from '@/components/templates/basicTemplate'
import WriteFormTemplate from '@/components/layouts/write/writeFormTemplate'
import { FormEvent } from 'react'
import styled from 'styled-components'
import LabelInput from '@/components/common/labelInput'
import LabelTextArea from '@/components/common/labelTextArea'

function Intro() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title')
    const content = formData.get('content')
    console.log(title, content)
  }

  return (
    <BasicTemplate title="Intro" hasBackButton>
      <WriteFormTemplate
        description="Enter news you like to share"
        buttonText="Register"
        onSubmit={onSubmit}
      >
        <Group>
          <LabelInput label="Title" name="title"></LabelInput>
          <StyledLabelTextArea label="Content" name="content"></StyledLabelTextArea>
        </Group>
      </WriteFormTemplate>
    </BasicTemplate>
  )
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
