import Header from '@/components/header'
import HeaderBackButton from '@/components/headerBackButton'
import useGoBack from '@/hooks/useGoBack'

const Login = () => {
  const goBack = useGoBack()
  return (
    <>
      <Header title="Login" headerLeft={<HeaderBackButton onClick={goBack} />}></Header>
    </>
  )
}

export default Login
