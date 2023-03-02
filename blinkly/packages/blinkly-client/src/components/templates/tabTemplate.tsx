import styled from 'styled-components'
import FullHeightPage from '../common/fullHeightPage'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/footer'

interface Props {
  children: React.ReactNode
}
const TabTemplate = ({ children }: Props) => {
  return (
    <FullHeightPage>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </FullHeightPage>
  )
}

export default TabTemplate

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
