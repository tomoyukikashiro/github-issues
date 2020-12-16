import { useParams } from 'react-router-dom'
import { FC, useContext, Suspense, Fragment } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { workSpaceContext } from '../../components/misc/WorkSpace'
import QueryItem from '../../components/query/QueryItem'
import { useToken } from '../../lib/Token'
import toResource from '../../lib/toResource'
import { getTasks, SearchDataType } from '../../lib/githubClient'
import { Query } from '../../lib/workSpaceData'

type QueryResourceType = {
  query: Query
  resource: () => SearchDataType[] | never
}

const WorkSpaceDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { token } = useToken()
  const { workSpaces } = useContext(workSpaceContext)
  const workSpace = workSpaces.find((ws) => ws.id === id)
  // todo 404 error
  if (!workSpace) return null
  if (!token) return null
  const queryResource: QueryResourceType[] = workSpace.queries.map((query) => ({
    query,
    resource: toResource(getTasks(token, query.queryString)),
  }))
  return (
    <AppLayout>
      <h1>WorkSpaceDetail</h1>
      <h2>
        workSpace name is
        {workSpace.name}
      </h2>
      {queryResource.map((qr) => (
        <Fragment key={qr.query.id}>
          <h2>{qr.query.name}</h2>
          <Suspense fallback={<>Loading...</>}>
            <QueryItem resource={qr.resource} />
          </Suspense>
        </Fragment>
      ))}
    </AppLayout>
  )
}

export default WorkSpaceDetail
