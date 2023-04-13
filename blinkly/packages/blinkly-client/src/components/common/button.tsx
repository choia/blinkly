import { ButtonHTMLAttributes } from 'react'
import { colors } from '@/lib/colors'
import styled, { css } from 'styled-components'

interface ButtonProps {
  layoutMode?: 'inline' | 'fullWidth'
  variant?: 'primary' | 'secondary'
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

const Button = ({ layoutMode = 'inline', variant = 'primary', ...rest }: Props) => {
  return <StyledButton layoutMode={layoutMode} variant={variant} {...rest} />
}

const variantStyles = {
  primary: css`
    background: ${colors.primary};
    color: white;
  `,
  secondary: css`
    background: ${colors.secondary};
    color: ${colors.primary};
  `,
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => variantStyles[props.variant!]}
  border: none;
  border-radius: 4px;
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
