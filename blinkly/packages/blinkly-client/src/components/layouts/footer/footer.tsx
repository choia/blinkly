import { colors } from '@/lib/colors'
import styled from 'styled-components'
import FooterItem from './footerItem'

const Footer = () => {
  return (
    <StyledFooter>
      <FooterItem />
      <FooterItem />
      <FooterItem />
      <FooterItem />
      <FooterItem />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  height: 56px;
  border-top: 1px solid ${colors.gray0};
`

export default Footer
