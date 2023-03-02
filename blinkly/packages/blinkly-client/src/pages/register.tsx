import BasicTemplate from '@/components/templates/basicTemplate'
import AuthForm from '@/components/layouts/auth/authForm'

const Register = () => {
  return (
    <BasicTemplate title="register" hasBackButton>
      <AuthForm mode="register" />
    </BasicTemplate>
  )
}

export default Register
