import { IComment } from '@/components/Feed/interfaces/IPhoto'
import { useUserStorage } from '@/hooks/useUserStorage'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PhotoCommentsForm } from '../PhotoCommentsForm'
import { Comment } from './Comment'
import * as S from './styles'

interface PhotoCommentsProps {
  comments: IComment[]
}

export function PhotoComments(props: PhotoCommentsProps) {
  const { user } = useUserStorage()
  const commentsSection = useRef<HTMLDivElement>(null)
  const [comments, setPhotoComments] = useState(props.comments)

  useEffect(() => {
    if (!commentsSection.current) return
    const commentSectionElement = commentsSection.current
    commentSectionElement.scrollTo({ top: commentSectionElement.scrollHeight })
  }, [comments])

  function renderCommentForm() {
    return user && <PhotoCommentsForm updateComments={updateComments} />
  }

  const updateComments = useCallback((aComment: IComment) => {
    setPhotoComments((comments) => [...comments, aComment])
  }, [])

  function renderComments() {
    return comments.map((comment) => (
      <Comment key={comment.comment_ID} {...comment} />
    ))
  }

  return (
    <>
      <S.PhotoCommentsContainer ref={commentsSection}>
        <S.Comments>{renderComments()}</S.Comments>
      </S.PhotoCommentsContainer>
      {renderCommentForm()}
    </>
  )
}
