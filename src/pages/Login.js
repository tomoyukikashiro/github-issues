import React from 'react'
import Button from '@material-ui/core/Button'
import { Redirect } from "react-router-dom";

import {login} from '../lib/firebase'

const Login = ({user}) => {
  return (
    <>
      {user ? (
        <Redirect to="/"/>
      ) : user && !user.token ? (
        <Redirect to="/settings/" />
      ): <Button variant="outlined" color="primary" onClick={login}>Login with Github</Button>}
    </>
  )
}
export default Login
