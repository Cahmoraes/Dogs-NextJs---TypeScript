import { Error } from '@/components/Error'
import { useFeedPhotos } from '@/hooks/useFeedPhotos'
import { FeedPhotosItem } from '../FeedPhotosItem'
import { FeedPhotosContainer } from './styles'

export function FeedPhotos() {
  const { photos, error, isLoading } = useFeedPhotos()

  if (error) return <Error message={error} />
  if (isLoading) return <p>Carregando...</p>

  function renderPhotosItems() {
    return photos.map((photo) => (
      <FeedPhotosItem key={photo.id} photo={photo} />
    ))
  }

  return (
    <FeedPhotosContainer className="animeLeft">
      {renderPhotosItems()}
    </FeedPhotosContainer>
  )
}
