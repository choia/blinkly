import BasicLayout from '@/components/templates/basicLayout'
import AuthForm from '@/components/layouts/auth/authForm'

const Register = () => {
  return (
    <BasicLayout title="register" hasBackButton>
      <AuthForm mode="register" />
    </BasicLayout>
  )
}

export default Register
