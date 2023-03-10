import { useUserStorage } from '@/hooks/useUserStorage'
import { PhotoCommentsForm } from '../PhotoCommentsForm'

interface PhotoCommentsProps {
  id: number
  comments: any[]
}

export function PhotoComments({ id, comments }: PhotoCommentsProps) {
  const { user } = useUserStorage()
  return <>{user && <PhotoCommentsForm />}</>
}
