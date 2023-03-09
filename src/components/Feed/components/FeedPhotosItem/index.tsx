import Image from 'next/image'
import { IPhoto } from '../../interfaces/IPhoto'
import { FeedPhotosItemContainer, Access } from './styles'

interface FeedPhotosProps {
  photo: IPhoto
}
export function FeedPhotosItem({ photo }: FeedPhotosProps) {
  return (
    <FeedPhotosItemContainer>
      <Image src={photo.src} alt={photo.title} width={300} height={300} />
      <Access>{photo.acessos}</Access>
    </FeedPhotosItemContainer>
  )
}
