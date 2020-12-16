import { FC, useContext } from 'react'
import { workSpaceContext } from '../../components/misc/WorkSpace'
import { Redirect } from 'react-router-dom'

const Index: FC = () => {
  const { workSpaces } = useContext(workSpaceContext)
  const path = workSpaces.length
    ? `/workspace/${workSpaces[0].id}`
    : '/workspace/create'
  return <Redirect to={path} />
}

export default Index
