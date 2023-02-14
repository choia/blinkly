import Header from '@/components/header'
import HeaderBackButton from '@/components/headerBackButton'
import useGoBack from '@/hooks/useGoBack'

const Register = () => {
  const goBack = useGoBack()
  return (
    <>
      <Header title="Register" headerLeft={<HeaderBackButton onClick={goBack} />} />
    </>
  )
}

export default Register
