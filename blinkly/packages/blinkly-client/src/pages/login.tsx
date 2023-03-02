import BasicTemplate from '@/components/templates/basicTemplate'
import AuthForm from '@/components/layouts/auth/authForm'

const Login = () => {
  return (
    <BasicTemplate title="login" hasBackButton>
      <AuthForm mode="login" />
    </BasicTemplate>
  )
}

export default Login
