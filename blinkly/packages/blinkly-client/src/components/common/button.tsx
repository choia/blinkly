import { ButtonHTMLAttributes } from 'react'
import { colors } from '@/lib/colors'
import styled, { css } from 'styled-components'

interface ButtonProps {
  layoutMode?: 'inline' | 'fullWidth'
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const Button = ({ layoutMode = 'inline', ...rest }: Props) => {
  return <StyledButton layoutMode={layoutMode} {...rest} />
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primary};
  border: none;
  border-radius: 4px;
  color: white;
  height: 48px;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 600;
  transition: filter 0.25s ease-in-out;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
    `}
`

export default Button
