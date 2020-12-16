import { Query, WorkSpaceData } from './workSpaceData'

export type QueryFormData = {
  id: string
  name: string
  queryString: { [value: string]: string }[]
}

export type WorkSpaceFormData = {
  id: string
  name: string
  queries: QueryFormData[]
}

export const toQueryForm = (query: Query): QueryFormData => {
  return {
    id: query.id,
    name: query.name || '',
    queryString: query.queryString.map((queryString) => {
      return { value: queryString }
    }),
  }
}

export const toWorkSpaceForm = (
  workSpace?: WorkSpaceData
): WorkSpaceFormData => {
  if (!workSpace) {
    return {
      id: '',
      name: '',
      queries: [],
    }
  }
  return {
    id: workSpace.id,
    name: workSpace.name || '',
    queries: workSpace.queries.map((query) => toQueryForm(query)),
  }
}

export const workSpaceForm2WorkSpace = (
  workSpaceFormData: WorkSpaceFormData
): WorkSpaceData => {
  return {
    id: workSpaceFormData.id,
    name: workSpaceFormData.name,
    queries: workSpaceFormData.queries.map((query) => {
      return {
        id: query.id,
        name: query.name,
        queryString: query.queryString.map((queryString) => queryString.value),
      }
    }),
  }
}
