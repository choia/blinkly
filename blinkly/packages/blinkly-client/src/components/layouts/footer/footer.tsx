import { colors } from '@/lib/colors'
import styled from 'styled-components'
import FooterItem from './footerItem'

const Footer = () => {
  return (
    <StyledFooter>
      <FooterItem icon="home" href="/" />
      <FooterItem icon="search" href="/search" />
      <FooterItem icon="plusCircle" href="/write" />
      <FooterItem icon="bookmark" href="/bookmarks" />
      <FooterItem icon="setting" href="/setting" />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  height: 56px;
  border-top: 1px solid ${colors.gray0};
`

export default Footer
