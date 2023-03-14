import { FeedContextProvider } from '@/contexts/FeedContext'
import { useCallback, useEffect, useState } from 'react'
import { FeedModal } from './components/FeedModal'
import { FeedPhotos } from './components/FeedPhotos'
import { FeedContainer } from './styles'

interface FeedProps {
  userId?: number | string
}

export function Feed({ userId = 0 }: FeedProps = {}) {
  const [pages, setPages] = useState<number[]>([1])
  const [infinite, setInfinite] = useState(true)

  useEffect(() => {
    let wait = false
    function infiniteScroll() {
      if (!infinite) return

      const scroll = window.scrollY
      const height = document.body.offsetHeight - window.innerHeight

      if (scroll > height * 0.75 && !wait) {
        setPages((state) => [...state, state.length++])
        wait = true

        setTimeout(() => {
          wait = false
        }, 500)
      }
    }

    window.addEventListener('scroll', infiniteScroll)
    window.addEventListener('wheel', infiniteScroll)
    return () => {
      window.removeEventListener('scroll', infiniteScroll)
      window.removeEventListener('wheel', infiniteScroll)
    }
  }, [infinite])

  const updateInfinite = useCallback(() => {
    setInfinite(false)
  }, [])

  return (
    <FeedContainer>
      <FeedContextProvider>
        <FeedModal />
        {pages.map((page) => (
          <FeedPhotos
            key={page}
            userId={userId}
            page={page}
            updateInfinite={updateInfinite}
          />
        ))}
      </FeedContextProvider>
    </FeedContainer>
  )
}
