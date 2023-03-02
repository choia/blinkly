import FullHeightPage from '../common/fullHeightPage'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/footer'
import styled from 'styled-components'

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
  flex: 1;
`
