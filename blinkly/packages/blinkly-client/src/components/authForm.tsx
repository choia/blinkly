import styled from 'styled-components'
import Button from './button'
import LabelInput from './labelInput'
import QuestionLink from './questionLink'

import { useEffect, useMemo, useState } from 'react'
import { useAuthForm } from '@/hooks/useAuthForm'
import { validate } from '@/lib/validate'

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
  const { inputProps, handleSubmit, errors, setError } = useAuthForm({
    mode: 'all',
    form: {
      username: {
        validate: mode === 'register' ? validate.username : undefined,
        validateErrorMessage: 'Must be 5-20 characters. (letter and numbers)',
      },
      password: {
        validate: mode === 'register' ? validate.password : undefined,
        validateErrorMessage:
          'Must be minimum 8 characters. Two types of letters, numbers, and special characters required',
      },
    },
    shouldPreventDefault: true,
    config: {
      method: 'Post',
      url: '/api/register',
      headers: { 'Content-Type': 'application/json' },
    },
  })

  const { usernamePlaceholder, passwordPlaceholder, buttonText, actionText, question, actionLink } =
    authDescriptions[mode]

  const [serverError, setServerError] = useState({ name: '', message: '', statusCode: 0 })

  const onSubmit = handleSubmit(() => {
    if (mode === 'register') {
      console.log('hi')
    }
  })

  useEffect(() => {
    if (serverError?.name === 'UserExistsError') {
      setError('username', 'User already exists')
    }
  }, [serverError, setError])

  return (
    <StyledForm method="POST" onSubmit={onSubmit}>
      <InputGroup>
        <LabelInput
          label="Username"
          placeholder={usernamePlaceholder}
          errorMessage={errors.username}
          {...inputProps.username}
        />
        <LabelInput
          label="Password"
          placeholder={passwordPlaceholder}
          errorMessage={errors.password}
          {...inputProps.password}
        />
      </InputGroup>
      <ActionBox>
        {serverError.name === 'AuthenticationError' ? (
          <ActionErrorMessage>Incorrect Account Information</ActionErrorMessage>
        ) : null}
        <Button type="submit" layoutMode="fullWidth">
          {buttonText}
        </Button>
        <QuestionLink name={actionText} question={question} to={actionLink} />
      </ActionBox>
    </StyledForm>
  )
}

const StyledForm = styled.form`
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

const ActionErrorMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: red;
`

export default AuthForm
