import { useRouter } from 'next/router'
import { ApiService } from '@/services/ApiService'
import { CookieService, CookieTypes } from '@/utils/CookieService'
import { createContext, ReactNode, useCallback, useState } from 'react'

interface IUserLoginDTO {
  username: string
  password: string
}

interface IUserGetResponse {
  id: number
  username: string
  nome: string
  email: string
}

interface UserContextData {
  user: IUserGetResponse | null
  error: string | null
  loading: boolean
  login: boolean
  userLogin(userLogin: IUserLoginDTO): Promise<void>
  userLogout(): Promise<void>
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<IUserGetResponse | null>(null)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const userLogout = useCallback(async () => {
    setUser(null)
    setError(null)
    setLogin(false)
    destroyCookies()
    router.push('/login')
  }, [router])

  const userLogin = useCallback(
    async ({ username, password }: IUserLoginDTO) => {
      try {
        setError(null)
        setLoading(true)

        const { data: token } = await ApiService.token.get({
          username,
          password,
        })
        CookieService.set({
          name: CookieTypes.TOKEN,
          value: token,
        })

        const { data: user } = await ApiService.user.get()
        CookieService.set({
          name: CookieTypes.USER,
          value: JSON.stringify(user),
        })

        setUser(user)
        setLogin(true)

        router.push('/conta')
      } catch (error) {
        if (error instanceof Error) setError('Usuário inválido')
        setLogin(false)
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  const destroyCookies = () => {
    CookieService.destroy({ name: CookieTypes.TOKEN })
    CookieService.destroy({ name: CookieTypes.USER })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        error,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
