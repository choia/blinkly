import { InputHTMLAttributes } from 'react'
import { colors } from '@/lib/colors'
import styled from 'styled-components'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null
}

const Input = ({ errorMessage, ...rest }: Props) => {
  return (
    <>
      <StyledInput {...rest} />
      {errorMessage ? <Message>{errorMessage}</Message> : null}
    </>
  )
}

const StyledInput = styled.input`
  height: 48px;
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding: 0 16px;
  color: ${colors.gray5};
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &:placeholder {
    color: ${colors.gray2};
  }
  &:disable {
    background: ${colors.gray0};
    color: ${colors.gray3};
  }
`
const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
`

export default Input
