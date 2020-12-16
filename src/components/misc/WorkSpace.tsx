import { createContext, FC, ReactElement, ReactNode, useState } from 'react'
import { getData, saveData } from '../../lib/storage'
import { WorkSpacesData } from '../../lib/workSpaceData'

export type WorkspaceContextProps = {
  workSpaceState: WorkSpacesData
  saveWorkSpaceState: (workSpaces: WorkSpacesData) => void
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const workSpaceContext = createContext<WorkspaceContextProps>(null!)

export const WorkSpaceProvider: FC = ({ children }) => {
  const initData = getData()
  const [workSpaceState, setWorkSpaceState] = useState<WorkSpacesData>(initData)
  const saveWorkSpaceState = (workSpaces: WorkSpacesData): void => {
    setWorkSpaceState(workSpaces)
    saveData(workSpaces)
  }
  return (
    <workSpaceContext.Provider value={{ workSpaceState, saveWorkSpaceState }}>
      {children}
    </workSpaceContext.Provider>
  )
}

export const WorkSpaceConsumer = ({
  children,
}: {
  children: (workSpaceState?: WorkSpacesData) => ReactNode
}): ReactElement => {
  return (
    <workSpaceContext.Consumer>
      {(states) => children(states.workSpaceState)}
    </workSpaceContext.Consumer>
  )
}
