import Link from 'next/link'
import { Bookmark, Home, PlusCircle, Search, Setting } from '@/components/vectors'
import { colors } from '@/lib/colors'
import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const IconMap = {
  home: Home,
  search: Search,
  bookmark: Bookmark,
  setting: Setting,
  plusCircle: PlusCircle,
}

interface Props {
  icon: keyof typeof IconMap
  href: string
}

const FooterItem = ({ icon, href }: Props) => {
  const router = useRouter()

  const iconEl = React.createElement(IconMap[icon])
  const className = router.asPath === href ? 'active' : ''
  return (
    <Item className={className}>
      <Link href={href}>{iconEl}</Link>
    </Item>
  )
}

const Item = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 32px;
    height: 32px;
    color: ${colors.gray3};
  }
  &.active {
    svg {
      color: ${colors.primary};
    }
  }
`

export default FooterItem
