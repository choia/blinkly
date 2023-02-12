import Image from 'next/image'

import styled from 'styled-components'
import { colors } from '../lib/colors'
import { Logo } from './vectors'

const Header = () => {
  return (
    <>
      <Block>
        <Logo />
      </Block>
    </>
  )
}

const Block = styled.header`
  height: 56px;
  border-bottom: 1px solid ${colors.gray3};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 58px;
    height: 18px;
  }
`
export default Header
