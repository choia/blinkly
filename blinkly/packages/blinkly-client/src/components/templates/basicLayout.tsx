import styled from 'styled-components'
import useGoBack from '@/hooks/useGoBack'
import FullHeightPage from '../common/fullHeightPage'
import Header from '../layouts/header/header'
import HeaderBackButton from '../layouts/header/headerBackButton'

interface Props {
  title?: string
  hasBackButton?: boolean
  children: React.ReactNode
  onGoback?(): void
}
const BasicLayout = ({ title, hasBackButton, children, onGoback }: Props) => {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <Header
        title={title}
        headerLeft={hasBackButton ? <HeaderBackButton onClick={onGoback ?? goBack} /> : undefined}
      />
      <Content>{children}</Content>
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default BasicLayout
