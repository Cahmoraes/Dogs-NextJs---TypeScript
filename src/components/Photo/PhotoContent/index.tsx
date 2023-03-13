import { Title } from '@/components/Title'
import { useUserStorage } from '@/hooks/useUserStorage'
import Skeleton from 'react-loading-skeleton'
import { IPhotoModal } from '../../Feed/interfaces/IPhoto'
import { PhotoComments } from '../PhotoComments'
import { PhotoDelete } from '../PhotoDelete'
import * as S from './styles'

interface PhotoContentProps {
  photoData: IPhotoModal
  single?: boolean
}

export function PhotoContent({ photoData, single = false }: PhotoContentProps) {
  const { photo, comments } = photoData
  const { user } = useUserStorage()

  function renderDeleteButtonOrAuthor() {
    return user?.username === photo.author ? (
      <PhotoDelete id={photo.id} />
    ) : (
      <S.Link href={`/perfil/${photo.author}`}>@{photo.author}</S.Link>
    )
  }

  if (!photo) return null
  return (
    <S.PhotoContentContainer data-single={single}>
      <S.Image src={photo.src} alt={photo.title} width={300} height={300} />

      <S.Details>
        <div>
          <S.Author>
            {renderDeleteButtonOrAuthor()}

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
      <PhotoComments comments={comments} single />
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
