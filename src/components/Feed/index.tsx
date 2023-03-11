import { FeedContextProvider } from '@/contexts/FeedContext'
import { FeedModal } from './components/FeedModal'
import { FeedPhotos } from './components/FeedPhotos'
import { FeedContainer } from './styles'

interface FeedProps {
  userId?: number
}

export function Feed({ userId = 0 }: FeedProps = {}) {
  return (
    <FeedContainer>
      <FeedContextProvider>
        <FeedModal />
        <FeedPhotos userId={userId} />
      </FeedContextProvider>
    </FeedContainer>
  )
}
