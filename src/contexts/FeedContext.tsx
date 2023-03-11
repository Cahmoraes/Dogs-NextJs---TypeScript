import {
  IComment,
  IPhoto,
  IPhotoModal,
} from '@/components/Feed/interfaces/IPhoto'
import { ApiService } from '@/services/ApiService'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface ICommentPhotoDTO {
  photoId: number
  comment: string
}

interface IErrorMessage {
  getPhotoError?: string | null
  addPhotoComment?: string | null
  deletePhoto?: string | null
}

interface FeedContextData {
  modalPhoto: IPhotoModal | null
  isLoading: boolean
  error: IErrorMessage | null
  selectModalPhoto(aPhoto: IPhoto): void
  closeModal(): void
  addCommentPhoto(commentPhoto: ICommentPhotoDTO): Promise<IComment | undefined>
  deletePhoto(photoId: number): Promise<void>
}

export const FeedContext = createContext({} as FeedContextData)

interface FeedContextProviderProps {
  children: ReactNode
}

interface ISelectErrorDTO {
  error: keyof IErrorMessage
  message: string
}

export function FeedContextProvider({ children }: FeedContextProviderProps) {
  const [modalPhoto, setModalPhoto] = useState<IPhotoModal | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<IErrorMessage | null>(null)

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

      selectError({
        error: 'getPhotoError',
        message: 'Não foi possível carregar foto',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addCommentPhoto = useCallback(
    async ({ photoId, comment }: ICommentPhotoDTO) => {
      try {
        return await ApiService.comment.post({
          photoId,
          comment,
        })
      } catch (error) {
        console.log(error)

        selectError({
          error: 'addPhotoComment',
          message: 'Não foi possível adicionar o comentário',
        })
      }
    },
    [],
  )

  const deletePhoto = useCallback(async (photoId: number) => {
    try {
      return await ApiService.photo.delete({
        id: photoId,
      })
    } catch (error) {
      console.log(error)
      selectError({
        error: 'deletePhoto',
        message: 'Não foi possível deletar a foto',
      })
    }
  }, [])

  const closeModal = useCallback(() => {
    setModalPhoto(null)
  }, [])

  const selectError = ({ error, message }: ISelectErrorDTO) => {
    setError((state) => ({ ...state, [error]: message }))
  }

  return (
    <FeedContext.Provider
      value={{
        modalPhoto,
        selectModalPhoto,
        closeModal,
        addCommentPhoto,
        deletePhoto,
        isLoading,
        error,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}
