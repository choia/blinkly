import { isValidPassword, isValidUsername } from '@/lib/regex'
import styled from 'styled-components'
import Button from './button'
import LabelInput from './labelInput'
import QuestionLink from './questionLink'
import axios, { AxiosError } from 'axios'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuthForm } from '@/hooks/useAuthForm'
import { validate } from '@/lib/validate'

interface Props {
  mode: 'login' | 'register'
}

interface AuthUserProps {
  username: string
  password: string
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

  const {
    url,
    usernamePlaceholder,
    passwordPlaceholder,
    buttonText,
    actionText,
    question,
    actionLink,
  } = authDescriptions[mode]

  // const { register, handleSubmit, formState, setError } = useForm<AuthUserProps>()
  // const onSubmit: SubmitHandler<AuthUserProps> = (data) => console.log('@@@onSubmit', data)

  const [serverError, setServerError] = useState({ name: '', message: '', statusCode: 0 })

  // const usernameErrorMessage = useMemo(() => {
  //   if (errors.username) {
  //     return 'Must be 5-20 characters. (letter and numbers)'
  //   }
  //   if (serverError.name === 'UserExistsError') {
  //     return 'Account already exists'
  //   }
  //   return undefined
  // }, [serverError, errors.username])

  // const [errors, setErrors] = useState({ name: '', errorMessage: '' })

  // const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   setError({})
  //   setErrors({})

  //   const form = new FormData(e.currentTarget)
  //   const username = form.get('username')
  //   const password = form.get('password')

  //   if (typeof username !== 'string' || typeof password !== 'string') {
  //     e.preventDefault()
  //     return
  //   }

  //   if (!isValidUsername(username)) {
  //     console.log('ususususuhihihihihihi')
  //     e.preventDefault()
  //     setErrors({
  //       name: 'username',
  //       errorMessage: 'Must be 5-20 characters. (letter and numbers)',
  //     })
  //     return
  //   }
  //   if (!isValidPassword(password)) {
  //     console.log('papapapaphihihihihihi')
  //     e.preventDefault()
  //     setErrors({
  //       name: 'password',
  //       errorMessage:
  //         'Must be minimum 8 characters. Two types of letters, numbers, and special characters required',
  //     })
  //     return
  //   }

  //   console.log('hello2')
  //   const data = {
  //     username,
  //     password,
  //   }

  // let config = {
  //   method: 'POST',
  //   url: '/api/register',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: data,
  // }

  //   try {
  //     const response = await axios(config)
  //     console.log('response after', response)
  //   } catch (e: any) {
  //     console.log(e.response.data.error)
  //     setError(e.response.data.error)
  //   }
  // }
  // const onSubmit = handleSubmit((values) => {
  //   console.log(values)
  // })
  const onSubmit = handleSubmit(() => {
    if (mode === 'register') {
      console.log(errors)
    }
  })

  useEffect(() => {
    if (serverError?.name === 'UserExistsError') {
      setError('username', 'User already exists')
    }
  }, [serverError, setError])

  return (
    // <StyledForm method="POST" onSubmit={handleSubmit(onSubmit)}>
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
