import { colors } from '@/lib/colors'
import styled from 'styled-components'
import Button from './button'
import Modal from './modal'

interface Props {
  visible: boolean
  title: string
  description: string
  onConfirm(): void
  onClose(): void
}

function Dialog({ visible, title, description, onConfirm, onClose }: Props) {
  return (
    <StyledModal visible={visible}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Footer>
        <Button onClick={onConfirm}>Log In</Button>
        <Button onClick={onClose} variant="secondary">
          Close
        </Button>
      </Footer>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 375px;
  max-width: calc(100vw - 32px);
  padding: 24px 16px;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray5};
`
const Description = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: ${colors.gray4};
  line-height: 1.5;
  white-space: pre-wrap;
  margin-bottom: 24px;
`

const Footer = styled.section`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`
export default Dialog
