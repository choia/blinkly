import AuthForm from '@/components/authForm'
import FullHeightPage from '@/components/fullHeightPage'
import Header from '@/components/header'
import HeaderBackButton from '@/components/headerBackButton'
import useGoBack from '@/hooks/useGoBack'

const Login = () => {
  const goBack = useGoBack()
  return (
    <FullHeightPage>
      <Header
        title="Login"
        headerLeft={<HeaderBackButton onClick={goBack} />}
      ></Header>
      <AuthForm mode="login" />
    </FullHeightPage>
  )
}

export default Login
