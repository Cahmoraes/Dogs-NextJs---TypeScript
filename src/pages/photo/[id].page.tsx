import { Error as ErrorComponent } from '@/components/Error'
import {
  PhotoContent,
  PhotoContentSkeleton,
} from '@/components/Photo/PhotoContent'
import { usePhoto } from '@/hooks/usePhoto'
import { useRouter } from 'next/router'
import { PhotoContainer } from './styles'

export default function Photo() {
  const router = useRouter()
  const { id } = router.query
  const { error, isLoading, photoData } = usePhoto(Number(id))

  function renderPhoto() {
    return photoData && <PhotoContent photoData={photoData} single />
  }

  if (error) return <ErrorComponent message={error} />
  if (isLoading)
    return (
      <PhotoContainer className="container">
        <PhotoContentSkeleton />
      </PhotoContainer>
    )
  return <PhotoContainer className="container">{renderPhoto()}</PhotoContainer>
}
