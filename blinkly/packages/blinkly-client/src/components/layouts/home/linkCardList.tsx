import { Item } from '@/pages/api/types'
import styled from 'styled-components'
import LinkCard from './linkCard'

interface Props {
  items: Item[]
}

function LinkCardList({ items }: Props) {
  return (
    <List>
      {items.map((item) => (
        <LinkCard key={item.id} item={item} />
      ))}
    </List>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
`
export default LinkCardList
