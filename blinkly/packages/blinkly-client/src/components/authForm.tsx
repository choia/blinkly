import styled from 'styled-components'
import LabelInput from './labelInput'

interface Props {
  mode: 'login' | 'register'
}

const AuthForm = ({ mode }: Props) => {
  return (
    <Block>
      <InputGroup>
        <LabelInput label="Username" />
        <LabelInput label="Password" />
      </InputGroup>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  /* background: red; */
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default AuthForm
