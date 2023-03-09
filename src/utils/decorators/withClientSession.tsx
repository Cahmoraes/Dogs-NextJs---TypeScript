import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import { useUserStorage } from '../../hooks/useUserStorage'
import { getRandomNumber } from '../getRandomNumber'
import dynamic from 'next/dynamic'
const DynamicSkeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false,
})

export function withClientSession(Component: ElementType) {
  return function Wrapper(props: {}) {
    const { isLoading, checkUserIsLogged } = useUserStorage()
    const router = useRouter()

    useEffect(() => {
      ;(async () => {
        const isLogged = await checkUserIsLogged()
        if (!isLogged) {
          await router.push('/')
        }
      })()
    }, [checkUserIsLogged, router])

    if (isLoading) {
      return (
        <SkeletonWrapper className="container">
          <DynamicSkeleton height={getRandomNumber(80, 130)} />
          <DynamicSkeleton height={getRandomNumber(100, 130)} />
          <DynamicSkeleton height={getRandomNumber(200, 130)} />
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
