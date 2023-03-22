import styled from 'styled-components'
import FullHeightPage from '../common/fullHeightPage'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/footer'

interface Props {
  children?: React.ReactNode
  className?: string
}

const TabLayout = ({ children, className }: Props) => {
  return (
    <FullHeightPage>
      <Header />
      <Content className={className}>{children}</Content>
      <Footer />
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`

export default TabLayout
