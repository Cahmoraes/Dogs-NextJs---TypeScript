import { GetServerSideProps } from 'next'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { LoginLayout } from './layout'
import { Input } from '@/components/forms/Input'
import { Button } from '@/components/forms/Button'
import { CookieService } from '@/utils/CookieService'
import { useUserStorage } from '@/hooks/useUserStorage'

const loginSchema = z.object({
  username: z.string().min(1, 'Preenchimento obrigatório'),
  password: z.string(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

interface LoginProps {
  userCookie?: string
}

export default function Login({ userCookie }: LoginProps) {
  const { userLogin } = useUserStorage()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  async function handleLogin({ username, password }: LoginSchemaType) {
    try {
      await userLogin({ username, password })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginLayout>
      <section>
        <h1>Login</h1>

        <form onSubmit={handleSubmit(handleLogin)}>
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

          <Button disabled={isSubmitting}>Enviar</Button>
        </form>

        <Link href="/login/criar">Login Criar</Link>
      </section>
    </LoginLayout>
  )
}
