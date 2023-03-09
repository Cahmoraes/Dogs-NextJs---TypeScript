import { withClientSession } from '@/utils/decorators/withClientSession'
import { useForm } from 'react-hook-form'
import { FormPhotoPost, ImagePreview, UserPhotoPostContainer } from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/forms/Input'
import { Button } from '@/components/forms/Button'
import { ApiService } from '@/services/ApiService'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withAccountLayout } from '@/utils/decorators/withLayout'

const FormUserPhotoPostSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  peso: z.number().min(1, 'Peso é obrigatório'),
  idade: z.number().min(1, 'Idade é obrigatório'),
  img: z.any().refine((files) => files?.length === 1, 'Imagem é obrigatório'),
})

type FormUserPhotoPostSchemaType = z.infer<typeof FormUserPhotoPostSchema>

function UserPhotoPost() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormUserPhotoPostSchemaType>({
    resolver: zodResolver(FormUserPhotoPostSchema),
  })

  console.log(errors)

  async function handleSubmitPhotoPost(
    data: FormUserPhotoPostSchemaType,
  ): Promise<void> {
    try {
      const { nome, peso, idade, img } = data
      const formData = new FormData()

      formData.append('nome', nome)
      formData.append('idade', idade.toString())
      formData.append('peso', peso.toString())
      formData.append('img', (img as FileList)[0])

      await ApiService.photo.post(formData)
      await router.push('/conta')
    } catch (error) {
      console.log(error)
    }
  }

  function handleImagePreview({ target }: ChangeEvent<HTMLInputElement>) {
    console.log(target)
    if (target?.files?.length! < 1) return
    const preview = URL.createObjectURL(target.files![0])
    setImagePreview(preview)
  }

  function renderImagePreview() {
    return (
      imagePreview && (
        <div>
          <ImagePreview style={{ backgroundImage: `url(${imagePreview})` }} />
        </div>
      )
    )
  }

  function rendeSubmitButton() {
    return (
      <Button disabled={isSubmitting}>
        {isSubmitting ? 'Carregando...' : 'Enviar'}
      </Button>
    )
  }

  return (
    <UserPhotoPostContainer className="animeLeft">
      <FormPhotoPost onSubmit={handleSubmit(handleSubmitPhotoPost)}>
        <Input label="Nome" error={errors.nome} {...register('nome')} />

        <Input
          label="Peso"
          type="number"
          error={errors.peso}
          {...register('peso', { valueAsNumber: true })}
        />

        <Input
          label="Idade"
          type="number"
          error={errors.idade}
          {...register('idade', { valueAsNumber: true })}
        />

        <input
          type="file"
          id="img"
          className="file"
          {...register('img')}
          onChange={handleImagePreview}
        />

        {rendeSubmitButton()}
      </FormPhotoPost>

      {renderImagePreview()}
    </UserPhotoPostContainer>
  )
}

export default applyDecorators(
  UserPhotoPost,
  withAccountLayout,
  withClientSession,
)
