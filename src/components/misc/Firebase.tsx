import {
  createContext,
  useEffect,
  useState,
  FC,
  ReactNode,
  ReactElement,
} from 'react'
import firebase from 'firebase/app'

type FirebaseContextType = {
  logIn: () => void
  logOut: () => void
  user: firebase.User | null
  db: firebase.firestore.Firestore
}

export const FirebaseContext = createContext<FirebaseContextType>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  logIn: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  logOut: null!,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  db: null!,
})

export const FirebaseProvider: FC = ({ children }) => {
  const auth = firebase.auth()
  const provider = new firebase.auth.GithubAuthProvider()
  const logIn = () => auth.signInWithRedirect(provider)
  const logOut = () => auth.signOut()
  const [session, setSession] = useState<{
    user: firebase.User | null
  }>({ user: null })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setSession({ user })
    })
  }, [auth, setSession])

  useEffect(() => {
    auth.getRedirectResult().catch(console.error)
  }, [auth])

  return (
    <FirebaseContext.Provider
      value={{ ...session, logIn, logOut, db: firebase.firestore() }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const FirebaseConsumer = ({
  children,
}: {
  children: (firebaseContext: FirebaseContextType) => ReactNode
}): ReactElement => {
  return (
    <FirebaseContext.Consumer>
      {(firebaseContext) => children(firebaseContext)}
    </FirebaseContext.Consumer>
  )
}
