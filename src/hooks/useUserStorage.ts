import { UserContext } from '@/contexts/UserContext'
import { useContext } from 'react'

export function useUserStorage() {
  return useContext(UserContext)
}
