import Image from 'next/image'
import Link from 'next/link'
import { IPhotoModal } from '../../Feed/interfaces/IPhoto'
import { PhotoComments } from '../PhotoComments'
import { PhotoContentContainer } from './styles'

interface PhotoContentProps {
  photoData: IPhotoModal
}

export function PhotoContent({ photoData }: PhotoContentProps) {
  const { photo, comments } = photoData

  return (
    <PhotoContentContainer>
      <div>
        <Image src={photo.src} alt={photo.title} width={300} height={300} />
      </div>

      <div>
        <div>
          <p>
            <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            <span>{photo.acessos}</span>
          </p>

          <h1>
            <Link href={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>

          <ul>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>

      <PhotoComments id={photo.id} comments={comments} />
    </PhotoContentContainer>
  )
}
