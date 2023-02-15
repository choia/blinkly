import styled from 'styled-components'
import Button from './button'
import LabelInput from './labelInput'
import QuestionLink from './questionLink'

interface Props {
  mode: 'login' | 'register'
}

const authDescriptions = {
  login: {
    usernamePlaceholder: 'Enter Username',
    passwordPlaceholder: 'Enter Password',
    buttonText: 'Login',
    actionText: 'Register',
    question: 'Want to Register?',
    actionLink: '/register',
  },
  register: {
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
    usernamePlaceholder,
    passwordPlaceholder,
    buttonText,
    actionText,
    question,
    actionLink,
  } = authDescriptions[mode]

  return (
    <Block>
      <InputGroup>
        <LabelInput label="Username" placeholder={usernamePlaceholder} />
        <LabelInput label="Password" placeholder={passwordPlaceholder} />
      </InputGroup>
      <ActionBox>
        <Button layoutMode="fullWidth">{buttonText}</Button>
        <QuestionLink name={actionText} question={question} to={actionLink} />
      </ActionBox>
    </Block>
  )
}

const Block = styled.div`
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
