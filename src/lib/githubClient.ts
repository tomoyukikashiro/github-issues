import { Octokit } from '@octokit/rest'
import { components } from '@octokit/openapi-types'

export type SearchDataType = components['schemas']['issue-search-result-item']

const pastDate = (past: number) =>
  new Date(new Date().setDate(new Date().getDate() - past))
const pastMonth = (past: number) =>
  new Date(new Date().setMonth(new Date().getMonth() - past))
const dateString = (date: Date) => date.toISOString().split('T')[0]

const convertSpecialQuery = (query: string) => {
  return query
    .replace(/\${today}/g, dateString(new Date()))
    .replace(/\${yesterday}/g, dateString(pastDate(1)))
    .replace(/\${lastWeek}/g, dateString(pastDate(7)))
    .replace(/\${lastMonth}/g, dateString(pastMonth(1)))
}

export const getTasks = async (
  token: string,
  queries: string[]
): Promise<SearchDataType[]> => {
  const octokit = new Octokit({ auth: token })
  const allData: SearchDataType[][] = await Promise.all(
    queries.map((query) => {
      return octokit.search
        .issuesAndPullRequests({ q: convertSpecialQuery(query) })
        .then((res) => res.data.items)
    })
  )
  return allData.reduce((result: SearchDataType[], items): SearchDataType[] => {
    const newItem = items.filter((i) => !result.find((j) => j.id === i.id))
    return [...result, ...newItem]
  }, [])
}
