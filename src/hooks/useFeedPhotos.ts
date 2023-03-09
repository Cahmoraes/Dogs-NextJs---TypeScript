import { IPhoto } from '@/components/Feed/interfaces/IPhoto'
import { ApiService } from '@/services/ApiService'
import { useEffect, useState } from 'react'

export function useFeedPhotos() {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const photosResponse = await ApiService.photos.get({
          page: 1,
          total: 6,
          user: 0,
        })

        console.log(photosResponse)
        setPhotos(photosResponse)
      } catch (error) {
        console.log(error)
        setError('Erro ao carregar fotos')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return {
    photos,
    error,
    isLoading,
  }
}
