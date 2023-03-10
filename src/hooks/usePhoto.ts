import { IPhotoModal } from '@/components/Feed/interfaces/IPhoto'
import { ApiService } from '@/services/ApiService'
import { useEffect, useState } from 'react'

export function usePhoto(id?: number) {
  const [photoData, setPhotoData] = useState<IPhotoModal | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      if (!id) return

      try {
        setIsLoading(true)

        const photoResponse = await ApiService.photo.get({
          id,
        })

        setPhotoData(photoResponse)
      } catch (error) {
        console.log(error)
        setError('Erro ao carregar fotos')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [id])

  return {
    photoData,
    error,
    isLoading,
  }
}
