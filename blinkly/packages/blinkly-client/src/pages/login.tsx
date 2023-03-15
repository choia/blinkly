import BasicTemplate from '@/components/templates/basicTemplate'
import AuthForm from '@/components/layouts/auth/authForm'
import { NextApiRequest } from 'next/types'

const Login = () => {
  return (
    <BasicTemplate title="login" hasBackButton>
      <AuthForm mode="login" />
    </BasicTemplate>
  )
}

export default Login
