import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFeed } from '@/hooks/useFeed'
import { SedIcon } from '@/assets/images/enviar'
import { IComment } from '@/components/Feed/interfaces/IPhoto'

const commentFormSchema = z.object({
  comment: z.string().min(1),
})

type CommentFormData = z.infer<typeof commentFormSchema>

interface PhotoCommentsFormProps {
  updateComments(aComment: IComment): void
}

export function PhotoCommentsForm({ updateComments }: PhotoCommentsFormProps) {
  const { modalPhoto, addCommentPhoto } = useFeed()
  const { handleSubmit, register } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  })

  if (!modalPhoto) return null
  const { photo } = modalPhoto

  async function handleCreateComment({ comment }: CommentFormData) {
    const commentResponse = await addCommentPhoto({
      photoId: photo.id,
      comment,
    })

    updateComments(commentResponse)
  }

  return (
    <form onSubmit={handleSubmit(handleCreateComment)}>
      <textarea {...register('comment')} />
      <button type="submit">
        <SedIcon />
      </button>
    </form>
  )
}
