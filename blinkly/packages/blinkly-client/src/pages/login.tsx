import useGoBack from '@/hooks/useGoBack'
import FullHeightPage from '@/components/common/fullHeightPage'
import Header from '@/components/layouts/header/header'
import HeaderBackButton from '@/components/layouts/header/headerBackButton'
import AuthForm from '@/components/layouts/auth/authForm'

const Login = () => {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <Header title="Login" headerLeft={<HeaderBackButton onClick={goBack} />}></Header>
      <AuthForm mode="login" />
    </FullHeightPage>
  )
}

export default Login
