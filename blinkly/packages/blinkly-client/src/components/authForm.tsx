import { isValidPassword, isValidUsername } from '@/lib/regex'
import register, { apiPostHandler } from '@/pages/api/register'
import { useState } from 'react'
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
    url2: '/login',
    usernamePlaceholder: 'Enter Username',
    passwordPlaceholder: 'Enter Password',
    buttonText: 'Login',
    actionText: 'Register',
    question: 'Want to Register?',
    actionLink: '/register',
  },
  register: {
    url: '/api/register',
    url2: '/register',
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
    url2,
    usernamePlaceholder,
    passwordPlaceholder,
    buttonText,
    actionText,
    question,
    actionLink,
  } = authDescriptions[mode]

  const [formData, setFormData] = useState({ usename: '', password: '' })

  const [isInvalidUsername, setIsInvalidUsername] = useState('')
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.name)
    console.log(e.target.value)

    const form = new FormData(e.currentTarget)
    const username = form.get('username')
    const password = form.get('password')

    if (typeof username !== 'string' || typeof password !== 'string') {
      // e.preventDefault()
      return
    }

    if (!isValidUsername(username) || !isValidPassword(password)) {
      // e.preventDefault()
      return
    }

    // const jsonData = {
    //   username,
    //   password,
    // }

    // const endpoint = '/api/register'
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
    // const response = await apiPostHandler(jsonData)
    // console.log(response)
  }

  return (
    // <StyledForm method="post" action={url}>
    <StyledForm method="POST" action={url} onSubmit={(e) => handleOnSubmit}>
      <InputGroup>
        <LabelInput
          label="Username"
          name="username"
          // value="username"
          placeholder={usernamePlaceholder}
          minLength={8}
        />
        <LabelInput
          label="Password"
          name="password"
          // value="password"
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

export default AuthForm
