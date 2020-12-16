import { FC } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import WorkSpaceForm from '../../components/workspace/WorkSpaceForm'
import { useWorkSpace, WorkSpaceData } from '../../lib/workSpaceData'

const WorkSpaceCreate: FC = () => {
  const { workSpace, addWorkSpace } = useWorkSpace(undefined)
  const setWorkSpace = (workSpace: WorkSpaceData) => {
    addWorkSpace(workSpace)
  }

  return (
    <AppLayout>
      <h1>WorkSpaceCreate</h1>
      <WorkSpaceForm workSpace={workSpace} setWorkSpace={setWorkSpace} />
    </AppLayout>
  )
}

export default WorkSpaceCreate
