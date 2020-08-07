import React from 'react'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import RouterLinkBehavior from './RouterLinkBehavior'
import { logout } from '../lib/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#fff'
  },
  main: {
    padding: '32px 0'
  }
}));

const Layout = ({ children, authUser }) => {
  const classes = useStyles()
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" color="inherit" component={RouterLinkBehavior}>GitHub Issues</Link>
              </Typography>
            {authUser && <Button color="inherit" onClick={logout}>Log out</Button> }
            <Button color="inherit" to="/settings/" component={RouterLinkBehavior}>SETTINGS</Button>
            <Button color="inherit" href="https://github.com/tomoyukikashiro/github-issues">CODE</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.main}>
        {children}
      </main>
    </>
  )
}

export default Layout
