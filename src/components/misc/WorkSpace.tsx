import { createContext, FC, ReactElement, ReactNode } from 'react'
import {
  useWorkSpace,
  UseWorkSpace,
  WorkSpacesData,
} from '../../lib/workSpaceData'

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const workSpaceContext = createContext<UseWorkSpace>(null!)

export const WorkSpaceProvider: FC = ({ children }) => {
  const states = useWorkSpace()

  return (
    <workSpaceContext.Provider value={{ ...states }}>
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
      {({ workSpaces }) => children(workSpaces)}
    </workSpaceContext.Consumer>
  )
}
