import { Error } from '@/components/Error'
import { usePhotos } from '@/hooks/usePhotos'
import { FeedPhotosItem, FeedPhotosItemSkeleton } from '../FeedPhotosItem'
import { FeedPhotosContainer } from './styles'

interface FeedPhotosProps {
  userId?: number
}

export function FeedPhotos({ userId = 0 }: FeedPhotosProps = {}) {
  const { photos, error, isLoading } = usePhotos({ userId })

  if (error) return <Error message={error} />
  if (isLoading) return <FeedPhotosSkeleton />

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

function FeedPhotosSkeleton() {
  return (
    <FeedPhotosContainer className="animeLeft">
      <FeedPhotosItemSkeleton />
      <FeedPhotosItemSkeleton />
      <FeedPhotosItemSkeleton />
      <FeedPhotosItemSkeleton />
      <FeedPhotosItemSkeleton />
      <FeedPhotosItemSkeleton />
    </FeedPhotosContainer>
  )
}
