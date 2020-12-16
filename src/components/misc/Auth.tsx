import { FC, useContext } from 'react'
import { FirebaseContext } from './Firebase'
import { Redirect } from 'react-router-dom'

const Auth: FC = ({ children }) => {
  const { user } = useContext(FirebaseContext)
  // todo login page
  if (!user) return <Redirect to="/" />
  return <>{children}</>
}

export default Auth
