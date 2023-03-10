import { useFeed } from '@/hooks/useFeed'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { IPhoto } from '../../interfaces/IPhoto'
import { FeedPhotosItemContainer, Access } from './styles'

interface FeedPhotosProps {
  photo: IPhoto
}
export function FeedPhotosItem({ photo }: FeedPhotosProps) {
  const { selectModalPhoto } = useFeed()

  function handlePhotoClick() {
    selectModalPhoto(photo)
  }

  return (
    <FeedPhotosItemContainer onClick={handlePhotoClick}>
      <Image src={photo.src} alt={photo.title} width={300} height={300} />
      <Access>{photo.acessos}</Access>
    </FeedPhotosItemContainer>
  )
}

export function FeedPhotosItemSkeleton() {
  return (
    <FeedPhotosItemContainer>
      <Skeleton style={{ height: '100%', width: '100%', minHeight: '200px' }} />
    </FeedPhotosItemContainer>
  )
}
