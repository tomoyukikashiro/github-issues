import { useEffect, useState, useCallback } from 'react'
import { db } from './firebase'

export const useAuthState = (auth, token = null) => {
  const [authUser, setAuthUser] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const listener = auth.onAuthStateChanged(setAuthUser)
    const removeListener = () => listener()
    if (!authUser) return removeListener

    db.collection('users').doc(authUser.uid)
      .then(doc => doc.exists && setUser(doc.data()))

    return removeListener
  }, [authUser, user])

  const onSetUser = useCallback(({uid, token}) => {
    db.collection('users').doc(uid).set({uid, token}, {merge: true})
  }, [token])

  return [user, onSetUser]
}
