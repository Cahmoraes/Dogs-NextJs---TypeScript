import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginLayout } from './layout/layout'
import { useUserStorage } from '@/hooks/useUserStorage'
import { Input } from '@/components/forms/Input'
import { Button } from '@/components/forms/Button'
import { Title } from '@/components/Title'
import { Error } from '@/components/Error'
import {
  Form,
  LinkCreate,
  LinkLost,
  RegisterContainer,
  Subtitle,
} from './styles'

const loginSchema = z.object({
  username: z.string().min(1, 'Preenchimento obrigatório'),
  password: z.string(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

interface LoginProps {
  userCookie?: string
}

export default function Login({ userCookie }: LoginProps) {
  const { login, error } = useUserStorage()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'dog',
      password: 'dog',
    },
  })

  async function handleLogin({ username, password }: LoginSchemaType) {
    try {
      await login({ username, password })
    } catch (error) {
      console.log(error)
    }
  }

  function rendeSubmitButton() {
    return (
      <Button disabled={isSubmitting}>
        {isSubmitting ? 'Carregando...' : 'Enviar'}
      </Button>
    )
  }

  return (
    <LoginLayout>
      <section className="animeLeft">
        <Title>Login</Title>

        <Form onSubmit={handleSubmit(handleLogin)}>
          <Input
            label="Usuário"
            id="username"
            type="text"
            error={errors?.username}
            {...register('username')}
          />

          <Input
            label="Senha"
            id="password"
            type="password"
            {...register('password')}
          />

          {rendeSubmitButton()}
          <Error message={error} />
        </Form>

        <LinkLost href="/login/perdeu">Perdeu a senha?</LinkLost>

        <RegisterContainer>
          <Subtitle>Cadastre-se</Subtitle>
          <p>Ainda não possui conta? Cadastre-se no site</p>
          <LinkCreate href="/login/criar">Cadastrar</LinkCreate>
        </RegisterContainer>
      </section>
    </LoginLayout>
  )
}
