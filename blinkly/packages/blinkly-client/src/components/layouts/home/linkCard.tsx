import { Item } from '@/pages/api/types'
import styled from 'styled-components'

interface Props {
  item: Item
}

function LinkCard(props: Props) {
  return <Block></Block>
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

export default LinkCard
