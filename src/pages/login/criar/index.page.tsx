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
import { useState } from 'react'
import { Error } from '@/components/Error'

const accountCreateDataSchema = z.object({
  username: z.string().min(1, 'Preencha um usuário válido'),
  email: z.string().email('Preencha um e-mail inválido'),
  password: z.string().min(1, 'Preencha uma senha válida'),
})

type AccountCreateData = z.infer<typeof accountCreateDataSchema>

export default function LoginCreate() {
  const { userLogin } = useUserStorage()
  const [createAccountError, setCreateAccountError] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AccountCreateData>({
    resolver: zodResolver(accountCreateDataSchema),
  })

  async function handleCreateAccount(userData: AccountCreateData) {
    try {
      await ApiService.user.post(userData)

      await userLogin({
        username: userData.username,
        password: userData.password,
      })
    } catch {
      setCreateAccountError('Erro ao criar usuário')
    }
  }

  function rendeSubmitButton() {
    return (
      <Button disabled={isSubmitting}>
        {isSubmitting ? 'Carregando...' : 'Cadastrar'}
      </Button>
    )
  }

  function renderCreateAccountError() {
    return <Error message={createAccountError} />
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
          {renderCreateAccountError()}
        </Form>
      </LoginCreateContainer>
    </LoginLayout>
  )
}
