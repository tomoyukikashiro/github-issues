import { useParams } from 'react-router-dom'
import { FC, useContext } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import WorkSpaceForm from '../../components/workspace/WorkSpaceForm'
import { workSpaceContext } from '../../components/misc/WorkSpace'

const WorkSpaceUpdate: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { workSpaces, updateWorkSpace } = useContext(workSpaceContext)
  const workSpace = workSpaces.find((ws) => ws.id === id)
  // todo 404 error
  if (!workSpace) return null
  return (
    <AppLayout>
      <h1>WorkSpaceUpdate</h1>
      <WorkSpaceForm workSpace={workSpace} setWorkSpace={updateWorkSpace} />
    </AppLayout>
  )
}

export default WorkSpaceUpdate
