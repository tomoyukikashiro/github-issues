import React, {useContext, Suspense } from 'react'
import {useParams} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import FileCopy from '@material-ui/icons/FileCopyOutlined'
import {IssueClosedIcon, IssueOpenedIcon, GitPullRequestIcon} from '@primer/octicons-react'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import {workSpaceContext} from '../lib/workspace'
import {saveData} from '../lib/storage'
import {tokenContext} from '../lib/token'
import { getTasks, cachedResults } from '../lib/github-client'
import QueryFormDialog from '../components/QueryFormDialog'

const relativeDateFormat = dateString => {
  const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' })
  const diff = Math.ceil((new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24))
  return rtf.format(diff, 'day')
}

const useStyles = makeStyles(() => ({
  workSpace: {
    marginBottom: 32
  },
  addIcon: {
    position: 'fixed',
    bottom: 50,
    right: 100,
    zIndex: 1
  }
}))

function ListItemLink(props) {
  return <ListItem button component="a" target="_blank" rel="noopener noreferrer" {...props} />;
}

const TaskIcon = ({ task }) => {
  if (task.hasOwnProperty('pull_request')) {
    return <GitPullRequestIcon verticalAlign='top' />
  } else if (task.state === 'close') {
    return <IssueClosedIcon verticalAlign='top' />
  } else {
    return <IssueOpenedIcon verticalAlign='top' />
  }
}

const TaskList = ({ tasks }) => {
  const repoName = (task) => task.repository_url.split('/').pop()
  const title = (task) => `#${task.number} ${task.title}`

  const onClickClipboard = task => {
    /* eslint-disable  */
    clipboard.writeText(toMarkdown(task))
  }

  const TaskInfo = ({task}) => {
    const useStyles = makeStyles({
      repo: {
        marginRight: '16px',
      },
      label: {
        marginRight: '8px',
      }
    })();
    return (
      <span style={{paddingTop: '8px'}}>
        <Typography
          component="span"
          variant="body2"
          className={useStyles.repo}
        >
          {repoName(task)}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={useStyles.repo}
        >
          {relativeDateFormat(task.updated_at)}
        </Typography>
        {task.labels.map(label => (
          <Chip component="span"
                size="small"
                label={label.name}
                key={label.id}
                className={useStyles.label}
                style={{color: '#fff', backgroundColor: `#${label.color}`}}/>
        ))}
      </span>
    )
  }

  if (!tasks.length) return (
    <List><ListItem>なし</ListItem></List>
  )
  return (
    <List>
      { tasks.map(task => (
        <ListItemLink key={task.id} href={task.html_url}>
          <ListItemIcon><TaskIcon task={task} /></ListItemIcon>
          <ListItemText primary={title(task)} secondary={<TaskInfo task={task}/>}/>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onClickClipboard(task)}>
              <FileCopy />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemLink>
      )) }
    </List>
  )
}

const TaskListSuspense = ({ token, queries }) => {
  if (!token) return <></>
  const tasks = cachedResults.get(queries)
  if (tasks) {
    return <TaskList tasks={tasks}/>
  }
  throw getTasks(token, queries)
}

const toMarkdown = task => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return `[${repo}] [${title}](${task.html_url})`
}

const WorkSpace = () => {
  const { workSpaceId } = useParams();
  const classes = useStyles()
  const { workSpaceState, setWorkSpaceState} = useContext(workSpaceContext)
  const [queryForm, setQueryForm] = React.useState({ open: false, query: null});
  const ws = workSpaceState.find(ws => ws.id === parseInt(workSpaceId, 10))
  const { tokenState } = useContext(tokenContext)
  const closeQueryForm = () => setQueryForm({...queryForm, open: false })
  const onClickEdit = query => {
    setQueryForm({ ...queryForm, open: true, query })
  }
  const onClickAdd = () => {
    setQueryForm({ open: true })
  }
  const onClickRemove = (query) => {
    ws.removeQuery(query)
    setWorkSpaceState([...workSpaceState])
    saveData(workSpaceState)
  }
  const onSubmit = queryHash => {
    if (queryHash.id) {
      ws.updateQuery(queryHash)
    } else {
      ws.addQuery(queryHash)
    }
    setWorkSpaceState([...workSpaceState])
    saveData(workSpaceState)
  }

  return (
    <>
      <QueryFormDialog { ...queryForm } setClose={closeQueryForm} onSubmit={onSubmit} />
      <Fab color="secondary" className={classes.addIcon} onClick={onClickAdd}>
        <AddIcon />
      </Fab>
      <Container>
        <header>
          <Typography gutterBottom variant="h3" component="h2">{ws.name}</Typography>
        </header>
        <div>
          { !!ws.queries.length && ws.queries.map(query => (
            <Card key={query.id} className={classes.workSpace}>
              <CardHeader variant="h4" titleTypographyProps={{variant: "h5"}}
                action={
                  <>
                    <IconButton onClick={() => onClickEdit(query)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onClickRemove(query)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                title={query.name}
              />
              <Divider variant="middle" />
              <Suspense fallback={<>Loading...</>}>
                <TaskListSuspense token={tokenState} queries={query.queryString}/>
              </Suspense>
            </Card>
          )) }
        </div>
      </Container>
    </>
  )
}

export default WorkSpace
