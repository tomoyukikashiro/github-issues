import React from 'react'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import RouterLinkBehavior from './RouterLinkBehavior'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#fff'
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  main: {
    padding: '32px 0'
  }
}));


const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link color="inherit" to="/" className={classes.link} component={RouterLinkBehavior}>GitHub Search</Link>
            </Typography>
            <Button color="inherit" to="/" component={RouterLinkBehavior}>HOME</Button>
            <Button color="inherit" to="/settings/" component={RouterLinkBehavior}>SETTINGS</Button>
            <Button color="inherit" href="https://github.com/tomoyukikashiro/github-search">CODE</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.main}>
        { children }
      </main>
    </>
  )
}

export default Layout
