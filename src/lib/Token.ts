import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../components/misc/Firebase'

type Token = string

type TokenState = {
  token: Token
  saveToken: (token: Token) => void
}

export const useToken = (): TokenState => {
  const { user, db } = useContext(FirebaseContext)
  const [tokenState, setTokenState] = useState<Token>('')
  const saveTokenState = (token: string): void => {
    setTokenState(token)
    // todo userは必ずある
    db.doc(`users/${user?.uid}`).set({ token })
  }

  useEffect(() => {
    const f = async () => {
      // todo userは必ずある
      if (!user?.uid) return
      const secrets = await db.doc(`users/${user?.uid}`).get()
      setTokenState((secrets.get('token') as string) || '')
    }
    f()
  }, [tokenState, setTokenState, user, db])

  return {
    token: tokenState,
    saveToken: saveTokenState,
  }
}
