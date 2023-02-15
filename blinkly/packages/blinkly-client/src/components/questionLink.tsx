import { colors } from '@/lib/colors'
import Link from 'next/link'
import styled from 'styled-components'

interface Props {
  question: string
  name: string
  to: string
  className?: string
}

const QuestionLink = ({ question, name, to, className }: Props) => {
  return (
    <Block className={className}>
      {question} <Link href={to}>{name}</Link>
    </Block>
  )
}

const Block = styled.div`
  color: ${colors.gray3};
  a {
    color: ${colors.gray5};
    font-weight: 600;
  }
`

export default QuestionLink
