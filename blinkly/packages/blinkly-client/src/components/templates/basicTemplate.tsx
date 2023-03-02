import useGoBack from '@/hooks/useGoBack'
import styled from 'styled-components'
import FullHeightPage from '../common/fullHeightPage'
import Header from '../layouts/header/header'
import HeaderBackButton from '../layouts/header/headerBackButton'

interface Props {
  title?: string
  hasBackButton: boolean
  children: React.ReactNode
}
const BasicTemplate = ({ title, hasBackButton, children }: Props) => {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <Header
        title={title}
        headerLeft={hasBackButton ? <HeaderBackButton onClick={goBack} /> : undefined}
      />
      <Content>{children}</Content>
    </FullHeightPage>
  )
}
export default BasicTemplate

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
