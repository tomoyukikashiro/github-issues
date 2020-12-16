import { WorkSpaceData } from './workSpaceData'

const workSpaceKey = 'github-search-workspace'
const tokenKey = 'github-search-token'

export const getData = (): WorkSpaceData[] | [] => {
  try {
    return JSON.parse(localStorage.getItem(workSpaceKey) || '[]')
  } catch {
    return []
  }
}

export const saveData = (workSpaces: WorkSpaceData[] = []): void => {
  try {
    localStorage.setItem(workSpaceKey, JSON.stringify(workSpaces))
  } catch {
    // ignore
  }
}

export const getToken = (): string => {
  try {
    return localStorage.getItem(tokenKey) || ''
  } catch {
    return ''
  }
}

export const saveToken = (token = ''): void => {
  try {
    localStorage.setItem(tokenKey, token)
  } catch {
    // ignore
  }
}
