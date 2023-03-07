import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import { useUserStorage } from '../hooks/useUserStorage'

export function withClientSession(Component: ElementType) {
  return function Wrapper(props: any) {
    const { isLoading, checkUserIsLogged } = useUserStorage()
    const router = useRouter()
    // console.log({ isLoading })

    useEffect(() => {
      ;(async () => {
        const isLogged = await checkUserIsLogged()
        if (!isLogged) {
          router.push('/login')
        }
      })()
    }, [checkUserIsLogged, router])

    if (isLoading) {
      return <p>Carregando...</p>
    }

    return <Component {...props} />
  }
}
