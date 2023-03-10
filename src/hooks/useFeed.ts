import { FeedContext } from '@/contexts/FeedContext'
import { useContext } from 'react'

export function useFeed() {
  return useContext(FeedContext)
}
