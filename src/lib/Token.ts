import { getToken, saveToken } from './storage'
import { useState } from 'react'

type Token = string

type TokenState = {
  token: Token
  saveToken: (token: Token) => void
}

export const useToken = (): TokenState => {
  const token = getToken()
  const [tokenState, setTokenState] = useState<Token>(token)
  const saveTokenState = (token: string): void => {
    setTokenState(token)
    saveToken(token)
  }
  return {
    token: tokenState,
    saveToken: saveTokenState,
  }
}
