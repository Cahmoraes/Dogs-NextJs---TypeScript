import { IPhoto } from '@/components/Feed/interfaces/IPhoto'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface FeedContextData {
  modalPhoto: IPhoto | null
  selectModalPhoto(aPhoto: IPhoto): void
}

export const FeedContext = createContext({} as FeedContextData)

interface FeedContextProviderProps {
  children: ReactNode
}

export function FeedContextProvider({ children }: FeedContextProviderProps) {
  const [modalPhoto, setModalPhoto] = useState<IPhoto | null>(null)

  const selectModalPhoto = useCallback((aPhoto: IPhoto) => {
    setModalPhoto(aPhoto)
  }, [])

  return (
    <FeedContext.Provider
      value={{
        modalPhoto,
        selectModalPhoto,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}
