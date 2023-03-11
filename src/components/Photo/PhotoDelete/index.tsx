import { useFeed } from '@/hooks/useFeed'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as S from './styles'

interface PhotoDeleteProps {
  id: number
}

export function PhotoDelete({ id }: PhotoDeleteProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { deletePhoto } = useFeed()
  const router = useRouter()

  async function handleDeletePhoto() {
    try {
      const confirm = window.confirm('Tem certeza que deseja deletar?')
      if (!confirm) return
      setIsLoading(true)
      await deletePhoto(id)
      router.reload()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function renderDeleteButton() {
    return isLoading ? (
      <S.DeleteButton>Deletando</S.DeleteButton>
    ) : (
      <S.DeleteButton onClick={handleDeletePhoto}>Deletar</S.DeleteButton>
    )
  }

  return <S.PhotoDeleteContainer>{renderDeleteButton()}</S.PhotoDeleteContainer>
}
