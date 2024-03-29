import { colors } from '@/lib/colors'
import { forwardRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Input, { type Props as InputProps } from './input'

interface Props extends InputProps {
  label: string
}

const LabelInput = forwardRef<HTMLInputElement, Props>(({ label, ...rest }: Props, ref) => {
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
      <Input onFocus={onFocus} onBlur={onBlur} {...rest} ref={ref} />
    </Block>
  )
})

LabelInput.displayName = 'LabelInput'

const Block = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.div<{ focused: boolean }>`
  color: ${colors.gray4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 8px;
  transition: all 0.25s ease-in-out;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`

export default LabelInput
