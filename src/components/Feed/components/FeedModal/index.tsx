import { Error } from '@/components/Error'
import { PhotoContent } from '@/components/Photo/PhotoContent'
import { useFeed } from '@/hooks/useFeed'
import { usePhoto } from '@/hooks/usePhoto'
import Skeleton from 'react-loading-skeleton'
import { FeedModalContainer } from './styles'

export function FeedModal() {
  const { modalPhoto } = useFeed()
  const { photoData, isLoading, error } = usePhoto(modalPhoto?.id)
  console.log(photoData)

  function renderError() {
    return error && <Error message={error} />
  }

  if (!photoData) return null
  if (isLoading) return <Skeleton width={300} height={300} />
  return (
    <FeedModalContainer>
      {renderError()}

      <PhotoContent photoData={photoData} />
    </FeedModalContainer>
  )
}
