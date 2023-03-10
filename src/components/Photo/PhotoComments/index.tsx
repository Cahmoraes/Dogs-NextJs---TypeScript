import { IComment } from '@/components/Feed/interfaces/IPhoto'
import { useUserStorage } from '@/hooks/useUserStorage'
import { useCallback, useState } from 'react'
import { PhotoCommentsForm } from '../PhotoCommentsForm'
import * as S from './styles'

interface PhotoCommentsProps {
  comments: IComment[]
}

export function PhotoComments(props: PhotoCommentsProps) {
  const { user } = useUserStorage()
  const [comments, setPhotoComments] = useState(props.comments)

  function renderCommentForm() {
    return user && <PhotoCommentsForm updateComments={updateComments} />
  }

  const updateComments = useCallback((aComment: IComment) => {
    setPhotoComments((comments) => [...comments, aComment])
  }, [])

  return (
    <S.PhotoCommentsContainer>
      {renderCommentForm()}

      <S.Comments>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}:</b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </S.Comments>
    </S.PhotoCommentsContainer>
  )
}
