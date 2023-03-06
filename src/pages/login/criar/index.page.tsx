import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Title } from '@/components/Title'
import { LoginLayout } from '../layout/layout'
import { Form } from '../styles'
import { LoginCreateContainer } from './styles'
import { Input } from '@/components/forms/Input'
import { Button } from '@/components/forms/Button'
import { ApiService } from '@/services/ApiService'
import { useUserStorage } from '@/hooks/useUserStorage'

const accountCreateDataSchema = z.object({
  username: z.string().min(1, 'Preencha um usuário válido'),
  email: z.string().email('Preencha um e-mail inválido'),
  password: z.string().min(1, 'Preencha uma senha válida'),
})

type AccountCreateData = z.infer<typeof accountCreateDataSchema>

export default function LoginCreate() {
  const { userLogin } = useUserStorage()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AccountCreateData>({
    resolver: zodResolver(accountCreateDataSchema),
  })

  async function handleCreateAccount(userData: AccountCreateData) {
    console.log(userData)
    try {
      const response = await ApiService.user.post(userData)

      await userLogin({
        username: userData.username,
        password: userData.password,
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  function rendeSubmitButton() {
    return (
      <Button disabled={isSubmitting}>
        {isSubmitting ? 'Carregando...' : 'Cadastrar'}
      </Button>
    )
  }

  return (
    <LoginLayout>
      <LoginCreateContainer className="anime-left">
        <Title>Cadastre-se</Title>

        <Form onSubmit={handleSubmit(handleCreateAccount)}>
          <Input
            label="Usuário"
            {...register('username')}
            error={errors.username}
          />

          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email}
          />

          <Input
            label="Senha"
            type="password"
            {...register('password')}
            error={errors.password}
          />

          {rendeSubmitButton()}
        </Form>
      </LoginCreateContainer>
    </LoginLayout>
  )
}
