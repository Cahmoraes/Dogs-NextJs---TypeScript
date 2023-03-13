import { IPhoto } from '@/components/Feed/interfaces/IPhoto'
import { ApiService } from '@/services/ApiService'
import { useEffect, useState } from 'react'

interface IUsePhotosProps {
  userId?: number | string
  page?: number
  updateInfinite(): void
}

export function usePhotos({
  userId = 0,
  page = 1,
  updateInfinite,
}: IUsePhotosProps) {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const totalPhotosPerRequest = 3

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const photosResponse = await ApiService.photos.get({
          page,
          total: 6,
          user: userId,
        })

        setPhotos(photosResponse)

        const totalPhotos = photosResponse.length
        if (totalPhotos < totalPhotosPerRequest) {
          updateInfinite()
        }
      } catch (error) {
        console.log(error)
        setError('Erro ao carregar fotos')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [userId, page, updateInfinite])

  return {
    photos,
    error,
    isLoading,
  }
}
