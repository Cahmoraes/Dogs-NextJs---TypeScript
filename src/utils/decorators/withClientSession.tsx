import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import { useUserStorage } from '../../hooks/useUserStorage'

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

    if (isLoading) {
      return <p>Carregando...</p>
    }

    return <Component {...props} />
  }
}
