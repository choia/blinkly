import { colors } from '@/lib/colors'
import { forwardRef, useState } from 'react'
import styled, { css } from 'styled-components'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const LabelTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, onBlur, onFocus, className, ...rest }: Props, ref) => {
    const [focused, setFocused] = useState(false)
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.(e)
      setFocused(true)
    }
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(e)
      setFocused(false)
    }

    return (
      <Block className={className}>
        <Label focused={focused}>{label}</Label>
        <StyledTextArea
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
          ref={ref}
        ></StyledTextArea>
      </Block>
    )
  },
)

LabelTextArea.displayName = 'LabelTextArea'

const Label = styled.div<{ focused: boolean }>`
  color: ${colors.gray4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 8px;
  transition: all 0.25s ease-in-out
    ${(props) =>
      props.focused &&
      css`
        color: ${colors.primary};
      `};
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTextArea = styled.textarea`
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding: 16 16px;
  line-height: 1.5;
  color: ${colors.gray5};
  transition: all 0.25s ease-in-out;
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

export default LabelTextArea
