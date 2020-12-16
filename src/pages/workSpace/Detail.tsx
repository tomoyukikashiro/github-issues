import { useParams } from 'react-router-dom'
import { FC, useContext } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { workSpaceContext } from '../../components/misc/WorkSpace'

const WorkSpaceDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { workSpaceState } = useContext(workSpaceContext)
  // todo 404 error
  if (!workSpaceState || !workSpaceState.length) return null
  const workSpace = workSpaceState.find((workSpace) => workSpace.id === id)
  if (!workSpace) return null
  return (
    <AppLayout>
      <h1>WorkSpaceDetail</h1>
      <h2>
        workSpace name is
        {workSpace.name}
      </h2>
    </AppLayout>
  )
}

export default WorkSpaceDetail
