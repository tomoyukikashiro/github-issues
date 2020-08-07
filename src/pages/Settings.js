import React from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
// import {tokenContext} from '../lib/token'
// import {saveToken} from '../lib/storage'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: '40px'
  },
}));

const Settings = ({user, setUser}) => {
  const classes = useStyles()
  // const { tokenState, setTokenState } = useContext(tokenContext)
  const onSubmit = (e) => {
    const token = e.target.elements.namedItem('token').value
    // setTokenState(token)
    // saveToken(token)
    setUser({uid: user.uid, token})
    e.preventDefault()
  }
  return (
    <Container maxWidth="md">
      <form onSubmit={onSubmit}>
        <TextField className={classes.input} required label="token" fullWidth defaultValue={user.token || ''} name="token"/>
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </form>
    </Container>
  )
}

export default Settings
