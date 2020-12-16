import { ReactElement } from 'react'
import { SearchDataType } from '../../lib/githubClient'

const QueryItem = ({
  resource,
}: {
  resource: () => SearchDataType[]
}): ReactElement => {
  const issues = resource()
  return (
    <>
      <h3>QueryItem</h3>
      {issues.map((issue) => (
        <div key={issue.id}>{issue.id}</div>
      ))}
    </>
  )
}

export default QueryItem
