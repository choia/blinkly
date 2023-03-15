import { FormEvent } from 'react'
import styled from 'styled-components'
import Button from '@/components/common/button'
import { colors } from '@/lib/colors'

interface Props {
  children?: React.ReactNode
  description: string
  buttonText: string
  onSubmit(e: FormEvent<HTMLFormElement>): void
}

function WriteFormTemplate({ children, description, buttonText, onSubmit }: Props) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <h3>{description}</h3>
      <Content>{children}</Content>
      <Button>{buttonText}</Button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  h3 {
    color: ${colors.gray5};
    line-height: 1.5;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
`

const Content = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default WriteFormTemplate
