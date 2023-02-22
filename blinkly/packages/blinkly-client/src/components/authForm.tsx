import styled from 'styled-components'
import Button from './button'
import LabelInput from './labelInput'
import QuestionLink from './questionLink'

interface Props {
  mode: 'login' | 'register'
}

const authDescriptions = {
  login: {
    url: '/api/login',
    usernamePlaceholder: 'Enter Username',
    passwordPlaceholder: 'Enter Password',
    buttonText: 'Login',
    actionText: 'Register',
    question: 'Want to Register?',
    actionLink: '/register',
  },
  register: {
    url: '/api/register',
    usernamePlaceholder: 'Must have at least 6 characters',
    passwordPlaceholder: 'Minimum 8 characters. Must contain letters & numbers',
    buttonText: 'Register',
    actionText: 'Login',
    question: 'Want to Login?',
    actionLink: '/login',
  },
} as const

const AuthForm = ({ mode }: Props) => {
  const {
    url,
    usernamePlaceholder,
    passwordPlaceholder,
    buttonText,
    actionText,
    question,
    actionLink,
  } = authDescriptions[mode]

  return (
    <Block method="post" action={url}>
      <InputGroup>
        <LabelInput
          label="Username"
          name="username"
          placeholder={usernamePlaceholder}
          minLength={8}
        />
        <LabelInput
          label="Password"
          name="password"
          placeholder={passwordPlaceholder}
          // pattern="[a-z0-9]{1,12}"
          minLength={8}
          title="Password should digits (0-9) or alpahbets (a-z)"
        />
      </InputGroup>
      <ActionBox>
        <Button type="submit" layoutMode="fullWidth">
          {buttonText}
        </Button>
        <QuestionLink name={actionText} question={question} to={actionLink} />
      </ActionBox>
    </Block>
  )
}

const Block = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
  justify-content: space-between;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ActionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

export default AuthForm
