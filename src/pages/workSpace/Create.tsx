import { FC, useContext } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import WorkSpaceForm from '../../components/workspace/WorkSpaceForm'
import { workSpaceContext } from '../../components/misc/WorkSpace'

const WorkSpaceCreate: FC = () => {
  const { addWorkSpace } = useContext(workSpaceContext)
  return (
    <AppLayout>
      <h1>WorkSpaceCreate</h1>
      <WorkSpaceForm setWorkSpace={addWorkSpace} />
    </AppLayout>
  )
}

export default WorkSpaceCreate
