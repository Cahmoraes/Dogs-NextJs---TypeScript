import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFeed } from '@/hooks/useFeed'
import { SedIcon } from '@/assets/images/enviar'
import { IComment } from '@/components/Feed/interfaces/IPhoto'
import * as S from './styles'
import { Error as ErrorComponent } from '@/components/Error'

const commentFormSchema = z.object({
  comment: z.string().min(1),
})

type CommentFormData = z.infer<typeof commentFormSchema>

interface PhotoCommentsFormProps {
  updateComments(aComment: IComment): void
  single?: boolean
}

export function PhotoCommentsForm({
  updateComments,
  single,
}: PhotoCommentsFormProps) {
  const { modalPhoto, addCommentPhoto, error } = useFeed()
  const { handleSubmit, register, reset } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  })

  if (!modalPhoto) return null
  const { photo } = modalPhoto

  async function handleCreateComment({ comment }: CommentFormData) {
    try {
      const commentResponse = await addCommentPhoto({
        photoId: photo.id,
        comment,
      })

      if (!commentResponse) throw new Error('Erro ao adicionar comentário')

      updateComments(commentResponse)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  function renderError() {
    return error && <ErrorComponent message={error.addPhotoComment} />
  }

  return (
    <S.Form onSubmit={handleSubmit(handleCreateComment)} data-single={single}>
      {renderError()}
      <S.Textarea {...register('comment')} />
      <S.Button type="submit">
        <SedIcon />
      </S.Button>
    </S.Form>
  )
}
