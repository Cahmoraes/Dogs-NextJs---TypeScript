import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useFeed } from '@/hooks/useFeed'
import { SedIcon } from '@/assets/images/enviar'

const commentFormSchema = z.object({
  comment: z.string().min(1),
})

type CommentFormData = z.infer<typeof commentFormSchema>

export function PhotoCommentsForm() {
  const { modalPhoto, addCommentPhoto } = useFeed()
  const { handleSubmit, register } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
  })

  if (!modalPhoto) return null
  const { photo } = modalPhoto

  async function handleCreateComment({ comment }: CommentFormData) {
    await addCommentPhoto({
      photoId: photo.id,
      comment,
    })
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
