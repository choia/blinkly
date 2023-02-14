import { colors } from '@/lib/colors'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import Input, { type Props as InputProps } from './input'

interface Props extends InputProps {
  label: string
}

const LabelInput = ({ label, ...rest }: Props) => {
  const [focused, setFocused] = useState(false)
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }

  return (
    <Block>
      <Label focused={focused}>{label}</Label>
      <Input onFocus={onFocus} onBlur={onBlur} {...rest} />
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.div<{ focused: boolean }>`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  font-weight: 600;
  /* background: red; */
  margin-bottom: 8px;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`

export default LabelInput
