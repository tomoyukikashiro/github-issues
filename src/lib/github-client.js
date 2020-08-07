import GitHub from 'github-api';

let gh = null;
export const cachedResults = new Map()

const pastDate = past => new Date(new Date().setDate(new Date().getDate() - past))
const pastMonth = past => new Date(new Date().setMonth(new Date().getMonth() - past))
const dateString = date => date.toISOString().split('T')[0]

const convertSpecialQuery = query => {
  return query
    .replace(/\${today}/g, dateString(new Date()))
    .replace(/\${yesterday}/g, dateString(pastDate(1)))
    .replace(/\${lastWeek}/g, dateString(pastDate(7)))
    .replace(/\${lastMonth}/g, dateString(pastMonth(1)))
}

export const getTasks = async (token, queries) => {
  gh = gh || new GitHub({ token: token}).search()
  const items = await Promise.all(queries.map(query => {
    return gh.forIssues({q: convertSpecialQuery(query)})
      .then(res => res.data)
  }))
  const uniqItems = items.reduce((result, items) => {
    const newItem = items.filter(i => !result.find(j => j.id === i.id))
    return [...result, ...newItem]
  }, [])
  cachedResults.set(queries, uniqItems)
  return cachedResults
}
