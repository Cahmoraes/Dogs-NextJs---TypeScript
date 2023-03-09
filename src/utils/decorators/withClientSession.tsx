import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useUserStorage } from '../../hooks/useUserStorage'
import { getRandomNumber } from '../getRandomNumber'

export function withClientSession(Component: ElementType) {
  return function Wrapper(props: {}) {
    const { isLoading, checkUserIsLogged } = useUserStorage()
    const router = useRouter()

    useEffect(() => {
      ;(async () => {
        const isLogged = await checkUserIsLogged()
        if (!isLogged) {
          await router.push('/login')
        }
      })()
    }, [checkUserIsLogged, router])

    console.log({ isLoading })

    if (isLoading) {
      return (
        <SkeletonWrapper className="container">
          <Skeleton height={getRandomNumber(80, 130)} />
          <Skeleton height={getRandomNumber(100, 130)} />
          <Skeleton height={getRandomNumber(200, 130)} />
        </SkeletonWrapper>
      )
    }

    return <Component {...props} />
  }
}

const SkeletonWrapper = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})
