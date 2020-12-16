import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../components/misc/Firebase'
import firebase from 'firebase/app'

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

export type UseWorkSpace = {
  workSpaces: WorkSpacesData
  addWorkSpace: (workSpace: WorkSpaceData) => Promise<void>
  updateWorkSpace: (workSpace: WorkSpaceData) => Promise<void | null>
}

const workSpaceConverter: firebase.firestore.FirestoreDataConverter<WorkSpaceData> = {
  toFirestore(workSpace: WorkSpaceData) {
    return { name: workSpace.name, queries: workSpace.queries }
  },
  fromFirestore(
    snapShot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): WorkSpaceData {
    const data = snapShot.data(options)
    return {
      id: snapShot.id,
      name: data.name,
      queries: data.queries.map((query: Query) => {
        return {
          id: query.id,
          name: query.name,
          queryString: query.queryString,
        }
      }),
    }
  },
}

export function useWorkSpace(): UseWorkSpace {
  const { user, db } = useContext(FirebaseContext)
  const [workSpaceState, setWorkSpaceState] = useState<WorkSpacesData>([])

  useEffect(() => {
    const sync = async () => {
      if (!user) return
      const querySnapshot = await db
        .collection(`users/${user.uid}/workspaces`)
        .withConverter(workSpaceConverter)
        .get()
      const data = querySnapshot.docs.map((doc) => doc.data())
      setWorkSpaceState(data)
    }
    sync()
  }, [setWorkSpaceState, user, db])

  useEffect(() => {
    if (!user) return
    return db
      .collection(`users/${user.uid}/workspaces`)
      .withConverter(workSpaceConverter)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data())
        setWorkSpaceState(data)
      })
  }, [setWorkSpaceState, user, db])

  const addWorkSpaceState = async (workSpace: WorkSpaceData): Promise<void> => {
    await db
      .collection(`users/${user?.uid}/workspaces`)
      .withConverter(workSpaceConverter)
      .add(workSpace)
  }

  const updateWorkSpace = async (
    workSpace: WorkSpaceData
  ): Promise<void | null> => {
    await db
      .doc(`users/${user?.uid}/workspaces/${workSpace.id}`)
      .withConverter(workSpaceConverter)
      .update(workSpace)
  }

  return {
    workSpaces: workSpaceState,
    addWorkSpace: addWorkSpaceState,
    updateWorkSpace: updateWorkSpace,
  }
}

export const generateQuery = (): Query => {
  return {
    id: Date.now().toString(),
    name: null,
    queryString: [],
  }
}
