import { IPhoto, IPhotoModal } from '@/components/Feed/interfaces/IPhoto'
import { ApiService } from '@/services/ApiService'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface ICommentPhotoDTO {
  photoId: number
  comment: string
}

interface FeedContextData {
  modalPhoto: IPhotoModal | null
  selectModalPhoto(aPhoto: IPhoto): void
  closeModal(): void
  addCommentPhoto(commentPhoto: ICommentPhotoDTO): Promise<void>
  isLoading: boolean
  error: string | null
}

export const FeedContext = createContext({} as FeedContextData)

interface FeedContextProviderProps {
  children: ReactNode
}

export function FeedContextProvider({ children }: FeedContextProviderProps) {
  const [modalPhoto, setModalPhoto] = useState<IPhotoModal | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const selectModalPhoto = useCallback(async (aPhoto: IPhoto) => {
    try {
      setIsLoading(true)
      setError(null)

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

  const addCommentPhoto = useCallback(
    async ({ photoId, comment }: ICommentPhotoDTO) => {
      try {
        const response = await ApiService.comment.post({ photoId, comment })
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  const closeModal = useCallback(() => {
    setModalPhoto(null)
  }, [])

  return (
    <FeedContext.Provider
      value={{
        modalPhoto,
        selectModalPhoto,
        closeModal,
        addCommentPhoto,
        isLoading,
        error,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}
