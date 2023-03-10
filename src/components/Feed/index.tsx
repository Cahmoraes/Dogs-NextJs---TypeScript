import { FeedContextProvider } from '@/contexts/FeedContext'
import { FeedModal } from './components/FeedModal'
import { FeedPhotos } from './components/FeedPhotos'
import { FeedContainer } from './styles'

export function Feed() {
  return (
    <FeedContainer>
      <FeedContextProvider>
        <FeedModal />
        <FeedPhotos />
      </FeedContextProvider>
    </FeedContainer>
  )
}
