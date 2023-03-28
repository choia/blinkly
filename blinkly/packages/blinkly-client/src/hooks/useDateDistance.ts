import { formatDistanceToNow } from 'date-fns'
import { useEffect, useMemo, useReducer } from 'react'

export function useDateDistance(date: string | Date) {
  const [value, rerender] = useReducer((state) => !state, false)

  useEffect(() => {
    const interval = setInterval(() => {
      rerender()
    }, 1000 * 60)
    return () => clearInterval(interval)
  })

  // console.log(value)

  const dateDistance = useMemo(() => {
    const d = date instanceof Date ? date : new Date(date)
    return formatDistanceToNow(d, {
      addSuffix: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, value])

  return dateDistance
}
