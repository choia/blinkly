import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import Overlay from './overlay'

interface Props {
  visible: boolean
  children: React.ReactNode
  className?: string
}

function Modal({ visible, className, children }: Props) {
  return (
    <>
      <Overlay />
      <PositionBox>
        <AnimatePresence>
          {visible && (
            <Block
              initial={{ y: '30vh', opacity: 0 }}
              animate={{ y: '0vh', opacity: 1 }}
              exit={{ y: '30vh', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className={className}
            >
              {children}
            </Block>
          )}
        </AnimatePresence>
      </PositionBox>
    </>
  )
}

const PositionBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Block = styled(motion.div)`
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

export default Modal
