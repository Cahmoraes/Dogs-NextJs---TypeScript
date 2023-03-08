import { withClientSession } from '@/utils/withClientSession'
import { useForm } from 'react-hook-form'
import { AccountLayout } from '../layout'
import { FormPhotoPost, UserPhotoPostContainer } from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/forms/Input'
import { Button } from '@/components/forms/Button'
import { ApiService } from '@/services/ApiService'

const FormUserPhotoPostSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  peso: z.number().min(1, 'Peso é obrigatório'),
  idade: z.number().min(1, 'Idade é obrigatório'),
  img: z.any().refine((files) => files?.length === 1, 'Imagem é obrigatório'),
})

type FormUserPhotoPostSchemaType = z.infer<typeof FormUserPhotoPostSchema>

function UserPhotoPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserPhotoPostSchemaType>({
    resolver: zodResolver(FormUserPhotoPostSchema),
  })

  console.log(errors)

  async function handleSubmitPhotoPost(data: FormUserPhotoPostSchemaType) {
    try {
      const { nome, peso, idade, img } = data
      const formData = new FormData()

      formData.append('nome', nome)
      formData.append('idade', idade.toString())
      formData.append('peso', peso.toString())
      formData.append('img', (img as FileList)[0])

      await ApiService.photo.post(formData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AccountLayout>
      <UserPhotoPostContainer className="animeLeft">
        <FormPhotoPost onSubmit={handleSubmit(handleSubmitPhotoPost)}>
          <Input label="Nome" {...register('nome')} />

          <Input
            label="Peso"
            type="number"
            {...register('peso', { valueAsNumber: true })}
          />

          <Input
            label="Idade"
            type="number"
            {...register('idade', { valueAsNumber: true })}
          />

          <input type="file" id="img" {...register('img')} />
          <Button>Enviar</Button>
        </FormPhotoPost>
      </UserPhotoPostContainer>
    </AccountLayout>
  )
}

export default withClientSession(UserPhotoPost)
