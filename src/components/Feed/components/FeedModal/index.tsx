import { MouseEvent } from 'react'
import { Error } from '@/components/Error'
import {
  PhotoContent,
  PhotoContentSkeleton,
} from '@/components/Photo/PhotoContent'
import { useFeed } from '@/hooks/useFeed'
import { FeedModalContainer } from './styles'
import { useEscapeKey } from '@/hooks/useEscapeKey'

export function FeedModal() {
  const { modalPhoto, closeModal, error, isLoading } = useFeed()
  useEscapeKey(closeModal)

  function renderError() {
    return error && <Error message={error.getPhotoError} />
  }

  function handleCloseModal(event: MouseEvent<HTMLDivElement>) {
    const { target, currentTarget } = event
    if (target === currentTarget) {
      closeModal()
    }
  }

  if (isLoading)
    return (
      <FeedModalContainer onClick={handleCloseModal}>
        <PhotoContentSkeleton />
      </FeedModalContainer>
    )

  if (!modalPhoto) return null

  return (
    <FeedModalContainer onClick={handleCloseModal}>
      {renderError()}

      <PhotoContent photoData={modalPhoto} />
    </FeedModalContainer>
  )
}
