import { Title } from '@/components/Title'
import Skeleton from 'react-loading-skeleton'
import { IPhotoModal } from '../../Feed/interfaces/IPhoto'
import { PhotoComments } from '../PhotoComments'
import * as S from './styles'

interface PhotoContentProps {
  photoData: IPhotoModal
}

export function PhotoContent({ photoData }: PhotoContentProps) {
  const { photo, comments } = photoData

  return (
    <S.PhotoContentContainer>
      <S.ImageContainer>
        <S.Image src={photo.src} alt={photo.title} width={300} height={300} />
      </S.ImageContainer>

      <S.Details>
        <div>
          <S.Author>
            <S.Link href={`/perfil/${photo.author}`}>@{photo.author}</S.Link>
            <S.Visualizations>{photo.acessos}</S.Visualizations>
          </S.Author>

          <Title>
            <S.Link href={`/photo/${photo.id}`}>{photo.title}</S.Link>
          </Title>

          <S.Attributes>
            <S.Attribute>{photo.peso} kg</S.Attribute>
            <S.Attribute>{photo.idade} anos</S.Attribute>
          </S.Attributes>
        </div>
      </S.Details>

      <PhotoComments id={photo.id} comments={comments} />
    </S.PhotoContentContainer>
  )
}

export function PhotoContentSkeleton() {
  return (
    <S.PhotoContentContainerSkeleton>
      <Skeleton width="100%" height="100%" />
    </S.PhotoContentContainerSkeleton>
  )
}
