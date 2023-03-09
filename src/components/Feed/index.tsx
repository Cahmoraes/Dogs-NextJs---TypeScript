import { FeedModal } from './components/FeedModal'
import { FeedPhotos } from './components/FeedPhotos'
import { FeedContainer } from './styles'

export function Feed() {
  return (
    <FeedContainer>
      <FeedModal />
      <FeedPhotos />
    </FeedContainer>
  )
}
