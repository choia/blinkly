/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe, HeartOutline } from '@/components/vectors'
import { colors } from '@/lib/colors'
import { Item } from '@/pages/api/types'
import styled from 'styled-components'
import { useDateDistance } from '@/hooks/useDateDistance'
import { useLikeManager } from '@/hooks/useLikeManager'
import LikeButton from '@/components/common/likeButton'
import { useItemOverrideById } from '@/contexts/itemOverrideContext'
import { client } from '@/lib/client'
import { useUser } from '@/contexts/userContext'
import { useDialog } from '@/contexts/dialogContext'
import { useRouter } from 'next/router'
import { useOpenLoginDialog } from '@/hooks/useOpenLoginDialog'

interface Props {
  item: Item
  cookies: any
}

function LinkCard({ item, cookies }: Props) {
  const { id, title, body, thumbnail, author, publisher, user, createdAt } = item
  const itemOverride = useItemOverrideById(id)
  const dateDistance = useDateDistance(createdAt)
  const { like, unlike } = useLikeManager()
  const currentUser = useUser()

  const itemStats = itemOverride?.itemStats ?? item.itemStats
  const isLiked = itemOverride?.isLiked ?? item.isLiked
  const likes = itemOverride?.itemStats.likes ?? itemStats.likes

  const openLoginDialog = useOpenLoginDialog()

  const toggleLike = async () => {
    if (!currentUser) {
      openLoginDialog('like')
      return
    }

    if (isLiked) {
      unlike(id, itemStats, cookies)
    } else {
      like(id, itemStats, cookies)
    }
  }

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
      <AnimatePresence initial={false}>
        {likes === 0 ? null : (
          <LikesCount
            key="likes"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 26, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {itemStats.likes.toLocaleString()} Likes
          </LikesCount>
        )}
      </AnimatePresence>

      <Footer>
        <LikeButton isLiked={isLiked} onClick={toggleLike} />
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
  font-size: 16px;
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

const LikesCount = styled(motion.div)`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray4};
  line-height: 1.5;
  height: 26px;
  display: flex;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LikeCountWrapper = styled.div`
  display: flex;
  height: 26px;
  gap: 12px;
`

const UserInfo = styled.div`
  color: ${colors.gray2};
  font-size: 14px;
`

export default LinkCard
