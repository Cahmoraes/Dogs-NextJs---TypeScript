import { memo } from 'react'
import * as S from './styles'

interface CommentProps {
  comment_ID: string
  comment_author: string
  comment_content: string
}

function CommentComponent(comment: CommentProps) {
  return (
    <S.CommentContainer>
      <b>{comment.comment_author}:</b>
      <span>{comment.comment_content}</span>
    </S.CommentContainer>
  )
}

export const Comment = memo(CommentComponent)
