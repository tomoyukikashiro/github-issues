import { getData } from './storage'
import { useContext, useState } from 'react'
import { workSpaceContext } from '../components/misc/WorkSpace'

export type WorkSpaceData = {
  id: string
  name: string | null
  queries: Query[]
}

export type WorkSpacesData = WorkSpaceData[]

export type Query = {
  id: string
  name: string | null
  queryString: string[]
}

type UseWorkSpaceA = {
  workSpace: WorkSpaceData
  addWorkSpace: (workSpace: WorkSpaceData) => void
  updateWorkSpace: (workSpace: WorkSpaceData) => void
}

type UseWorkSpaceB = {
  workSpace: WorkSpaceData | undefined
  addWorkSpace: (workSpace: WorkSpaceData) => void
  updateWorkSpace: (workSpace: WorkSpaceData) => void
}

// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
// https://stackoverflow.com/questions/52817922/typescript-return-type-depending-on-parameter
export function useWorkSpace<T extends string | undefined>(
  id: T
): T extends string ? UseWorkSpaceB : UseWorkSpaceA {
  const initData = getData()
  const [workSpaceState, setWorkSpaceState] = useState<WorkSpacesData>(initData)
  const { saveWorkSpaceState } = useContext(workSpaceContext)

  const saveWorkSpaces = (workSpaces: WorkSpacesData) => {
    setWorkSpaceState(workSpaces) // local variable in component
    saveWorkSpaceState(workSpaces) // app global variable
  }

  const addWorkSpaceState = (workSpace: WorkSpaceData): void => {
    const workSpaces = [...workSpaceState, workSpace]
    saveWorkSpaces(workSpaces)
  }

  const updateWorkSpace = (workSpace: WorkSpaceData): void => {
    const newStates = replaceWorkSpace(workSpaceState, workSpace)
    if (!newStates)
      return console.log(`the workSpace(${workSpace.id}) doesn't exist.`)
    saveWorkSpaces(newStates)
  }

  const states = {
    addWorkSpace: addWorkSpaceState,
    updateWorkSpace: updateWorkSpace,
  }
  // todo
  return id
    ? ({
        workSpace: workSpaceState.find((workSpace) => workSpace.id === id),
        ...states,
      } as never)
    : ({ workSpace: generateWorkSpace(), ...states } as never)
}

export const replaceWorkSpace = (
  workSpaces: WorkSpaceData[],
  newWorkSpace: WorkSpaceData
): WorkSpaceData[] | null => {
  const index = workSpaces.findIndex(
    (workSpace) => workSpace.id === newWorkSpace.id
  )
  if (index === -1) return null
  const list = [...workSpaces]
  list.splice(index, 1, newWorkSpace)
  return list
}

export const generateWorkSpace = (data?: WorkSpaceData): WorkSpaceData => {
  return {
    id: data?.id || Date.now().toString(),
    name: data?.name || null,
    queries: data?.queries || [],
  }
}

export const generateQuery = (): Query => {
  return {
    id: Date.now().toString(),
    name: null,
    queryString: [],
  }
}
