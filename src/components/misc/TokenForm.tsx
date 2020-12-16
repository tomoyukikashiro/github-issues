import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useToken } from '../../lib/Token'

type Inputs = {
  token: string
}

const TokenForm: FC = () => {
  const { token, saveToken } = useToken()
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const onSubmit = (data: Inputs) => {
    saveToken(data.token)
  }
  return (
    <>
      <h2>TokenForm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="token"
          type="text"
          ref={register({ required: true })}
          defaultValue={token}
        />
        {errors.token && <p>トークンを入力ください。</p>}
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default TokenForm
