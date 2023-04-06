import { Item } from '@/pages/api/types'
import styled from 'styled-components'
import LinkCard from './linkCard'

interface Props {
  items: Item[]
  cookies: any
}

function LinkCardList({ items, cookies }: Props) {
  return (
    <List>
      {items.map((item) => (
        <LinkCard key={item.id} item={item} cookies={cookies} />
      ))}
    </List>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`
export default LinkCardList
