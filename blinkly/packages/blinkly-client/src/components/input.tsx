import { colors } from '@/lib/colors'
import styled from 'styled-components'

export interface Props extends React.HTMLAttributes<HTMLInputElement> {}

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
    colors: ${colors.gray2};
  }
`

export default Input
