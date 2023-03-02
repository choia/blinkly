import useGoBack from '@/hooks/useGoBack'
import FullHeightPage from '@/components/common/fullHeightPage'
import Header from '@/components/layouts/header/header'
import HeaderBackButton from '@/components/layouts/header/headerBackButton'
import AuthForm from '@/components/layouts/auth/authForm'

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
