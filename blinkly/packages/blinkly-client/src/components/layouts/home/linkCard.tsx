/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { Globe, HeartOutline } from '@/components/vectors'
import { colors } from '@/lib/colors'
import { Item } from '@/pages/api/types'
import styled from 'styled-components'
import { useDateDistance } from '@/hooks/useDateDistance'
import { client } from '@/lib/client'

interface Props {
  item: Item
}

function LinkCard({ item }: Props) {
  const { id, title, body, link, thumbnail, author, publisher, user, createdAt } = item

  const handleLikeItem = async () => {
    try {
      const response = await axios.post('/api/itemLike', { param: id })
    } catch (e) {}
  }

  const dateDistance = useDateDistance(createdAt)
  return (
    <Block>
      {thumbnail ? <Thumbnail src={thumbnail} alt={title} /> : null}
      <Publisher>
        {publisher.favicon ? (
          <img src={publisher.favicon} alt="favicon" width={24} height={24} />
        ) : (
          <Globe />
        )}
        {author ? `${author} · ` : ''} {publisher.name}
      </Publisher>
      <h3>{title}</h3>
      <p>{body}</p>
      <Footer>
        <StyleHeartOutline
          onClick={() => {
            handleLikeItem()
          }}
        />
        <UserInfo>
          by <b>{user.username}</b> · {dateDistance}
        </UserInfo>
      </Footer>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    color: ${colors.gray5};
  }
  p {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: ${colors.gray4};
  }
`

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 288/192;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 3px rgb(0 0 0 / 15%);
  display: block;
  margin-bottom: 16px;
`

const Publisher = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray3};
  font-size: 14px;
  margin-bottom: 4px;
  line-height: 1.5;
  img,
  svg {
    display: block;
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`

const StyleHeartOutline = styled(HeartOutline)`
  color: ${colors.gray3};
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img,
  svg {
    display: block;
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`

const UserInfo = styled.div`
  color: ${colors.gray2};
  font-size: 14px;
`

export default LinkCard
