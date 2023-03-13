import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/forms/Button'
import { Input } from '@/components/forms/Input'
import { Title } from '@/components/Title'
import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withLoginLayout } from '@/utils/decorators/withLayout'
import { LostContainer } from './styles'
import { ApiService } from '@/services/ApiService'
import { useState } from 'react'
import { Error } from '@/components/Error'
import { Head } from '@/components/Head'

const lostPasswordDataSchema = z.object({
  login: z.string().min(1),
})

type LostPasswordType = z.infer<typeof lostPasswordDataSchema>

function LostPage() {
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LostPasswordType>({
    resolver: zodResolver(lostPasswordDataSchema),
  })

  async function handleLostPassword({ login }: LostPasswordType) {
    try {
      const data = await ApiService.lostPassword.post({
        login,
        url: window.location.href.replace('perdeu', 'resetar'),
      })

      setResponse(data)
    } catch (error) {
      console.log(error)
      setError('Erro ao resetar senha')
    }
  }

  function renderButton() {
    return isSubmitting ? (
      <Button disabled>Enviando...</Button>
    ) : (
      <Button>Enviar e-mail</Button>
    )
  }

  function renderForm() {
    return response ? (
      <p style={{ color: '#4c1' }}>{response}</p>
    ) : (
      <form onSubmit={handleSubmit(handleLostPassword)}>
        <Input label="Email / Usuário" {...register('login')} />
        {renderButton()}
      </form>
    )
  }

  return (
    <LostContainer>
      <Head>Perdeu a senha?</Head>
      <Title>Perdeu a senha</Title>
      {renderForm()}
      <Error message={error} />
    </LostContainer>
  )
}

export default applyDecorators(LostPage, withLoginLayout)
