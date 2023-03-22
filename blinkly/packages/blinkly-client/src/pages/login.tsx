import BasicLayout from '@/components/templates/basicLayout'
import AuthForm from '@/components/layouts/auth/authForm'

const Login = () => {
  return (
    <BasicLayout title="login" hasBackButton>
      <AuthForm mode="login" />
    </BasicLayout>
  )
}

export default Login
