import { useParams } from 'react-router-dom'
import { FC } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import WorkSpaceForm from '../../components/workspace/WorkSpaceForm'
import { useWorkSpace, WorkSpaceData } from '../../lib/workSpaceData'

const WorkSpaceUpdate: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { workSpace, updateWorkSpace } = useWorkSpace(id)
  // todo 404 error
  if (!workSpace) return null
  const setWorkSpace = (workSpace: WorkSpaceData) => {
    updateWorkSpace(workSpace)
  }
  return (
    <AppLayout>
      <h1>WorkSpaceUpdate</h1>
      <WorkSpaceForm workSpace={workSpace} setWorkSpace={setWorkSpace} />
    </AppLayout>
  )
}

export default WorkSpaceUpdate
