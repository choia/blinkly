import AuthForm from '@/components/authForm'
import FullHeightPage from '@/components/fullHeightPage'
import Header from '@/components/header'
import HeaderBackButton from '@/components/headerBackButton'
import useGoBack from '@/hooks/useGoBack'
import { GetServerSideProps, GetStaticProps } from 'next'
import { extractError } from '@/lib/error'
import axios from 'axios'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './error'
import { AuthParams, AuthResult } from './api/types/authTypes'
import useSWR from 'swr'
import { parseBody } from 'next/dist/server/api-utils/node'
import { apiPostHandler } from './api/register'
import { useState } from 'react'

const Register = () => {
  const goBack = useGoBack()

  // const [error, setError] = useState(null)

  return (
    <FullHeightPage>
      <Header title="Register" headerLeft={<HeaderBackButton onClick={goBack} />} />
      <AuthForm mode="register" />
    </FullHeightPage>
  )
}

export default Register

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   try {
//     console.log('@@error')
//     const body = await parseBody(req, '1mb')
//     const { result } = await apiPostHandler(body)
//     const data = result.user
//     console.log('@@@data', data)
//   } catch (error) {
//     console.log('hello', error)
//   }
//   console.log('@@serverside')
//   return {
//     props: {},
//   }
// }
