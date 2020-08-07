import React from 'react'
// import React, {useContext } from 'react'
// import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid'
// import Card from '@material-ui/core/Card'
// import CardHeader from '@material-ui/core/CardHeader'
// import CardContent from '@material-ui/core/CardContent'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions';
// import Typography from '@material-ui/core/Typography'
// import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Fab from '@material-ui/core/Fab'
// import AddIcon from '@material-ui/icons/Add'
// import WorkSpaceFormDialog from '../components/WorkSpaceFormDialog'
// import {saveData} from '../lib/storage'
// import {WorkSpace, workSpaceContext} from '../lib/workspace'
// import RouterLinkBehavior from '../components/RouterLinkBehavior'

const Index = () => {
  return <h1>home</h1>
}

/**
const useStyles = makeStyles(() => ({
  item: {
    minHeight: 200
  },
  addIcon: {
    position: 'fixed',
    bottom: 50,
    right: 100,
    zIndex: 1
  },
  actionButton: {
    justifyContent: 'flex-end'
  }
}));

const Index = () => {
  const { workSpaceState, setWorkSpaceState } = useContext(workSpaceContext)
  const [form, setForm] = React.useState({ open: false, name: null, workSpace: null});
  const classes = useStyles()

  const openForm = ({workSpace, name}) => setForm({open: true, workSpace, name})
  const closeForm = () => setForm({...form, open: false})
  const submitForm = ({workSpace, name}) => {
    if (workSpace) {
      workSpace.update(name)
    } else {
      setWorkSpaceState([...workSpaceState, new WorkSpace({name})])
    }
    saveData(workSpaceState)
  }
  const removeForm = workSpace => {
    const newWorkSpaceState = [...workSpaceState.filter(ws => ws.id !== workSpace.id)]
    saveData(newWorkSpaceState)
    setWorkSpaceState(newWorkSpaceState)
  }

  return (
    <>
      <WorkSpaceFormDialog {...form} setClose={closeForm} onSubmit={submitForm}/>
      <Fab color="secondary" className={classes.addIcon} onClick={openForm}>
        <AddIcon />
      </Fab>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {workSpaceState.map(ws => (
            <Grid item xs={6} sm={4} key={ws.id}>
              <Card>
                <CardHeader
                  title={ws.name}
                />
                <CardActionArea to={`/workspace/${ws.id}`} component={RouterLinkBehavior}>
                  <CardContent className={classes.item}>
                    {ws.queries.length
                      ? <ul>
                        { ws.queries.map(q => (
                          <Typography key={q.id} variant="body2" color="textSecondary" component="li">{q.name}</Typography>
                        )) }
                      </ul>
                      : null
                    }
                  </CardContent>
                </CardActionArea>
                <CardActions disableSpacing className={classes.actionButton}>
                  <IconButton onClick={() => openForm({workSpace: ws, name: ws.name})}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => removeForm(ws)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
**/

export default Index
