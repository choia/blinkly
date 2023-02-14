import AuthForm from '@/components/authForm'
import FullHeightPage from '@/components/fullHeightPage'
import Header from '@/components/header'
import HeaderBackButton from '@/components/headerBackButton'
import useGoBack from '@/hooks/useGoBack'
import styled from 'styled-components'

const Register = () => {
  const goBack = useGoBack()
  return (
    <FullHeightPage>
      <Header title="Register" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" />
    </FullHeightPage>
  )
}

export default Register
