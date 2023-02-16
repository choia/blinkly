import { InputHTMLAttributes } from 'react'
import { colors } from '@/lib/colors'
import styled from 'styled-components'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  return <StyledInput {...props} />
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

export default Input
