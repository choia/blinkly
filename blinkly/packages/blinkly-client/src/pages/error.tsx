import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

// export default function Error({ error }: { error: Error }) {
//   console.log('@ERROR', error)
//   useEffect(() => {
//     console.log('@from errror', error)
//   }, [error])

//   return (
//     <div>
//       <h2>hello, something went wrong</h2>
//       <h2>{error.message}</h2>
//     </div>
//   )
// }

export function ErrorFallback({ error, resetErrorBoundary }) {
  console.log('ErrorFallBack')
  return (
    <div role="alert">
      <p>SOmethign went wrong</p>
      <pre>{error.message}</pre>
    </div>
  )
}
