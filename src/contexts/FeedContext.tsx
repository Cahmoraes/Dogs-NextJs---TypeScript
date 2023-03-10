import { IPhoto, IPhotoModal } from '@/components/Feed/interfaces/IPhoto'
import { ApiService } from '@/services/ApiService'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface FeedContextData {
  modalPhoto: IPhotoModal | null
  selectModalPhoto(aPhoto: IPhoto): void
  closeModal(): void
  isLoading: boolean
  error: string
}

export const FeedContext = createContext({} as FeedContextData)

interface FeedContextProviderProps {
  children: ReactNode
}

export function FeedContextProvider({ children }: FeedContextProviderProps) {
  const [modalPhoto, setModalPhoto] = useState<IPhotoModal | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const selectModalPhoto = useCallback(async (aPhoto: IPhoto) => {
    try {
      setIsLoading(true)

      const photoResponse = await ApiService.photo.get({
        id: aPhoto.id,
      })

      setModalPhoto(photoResponse)
    } catch (error) {
      console.log(error)
      setError('Erro ao carregar fotos')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const closeModal = useCallback(() => {
    setModalPhoto(null)
  }, [])

  return (
    <FeedContext.Provider
      value={{
        modalPhoto,
        selectModalPhoto,
        closeModal,
        isLoading,
        error,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}
