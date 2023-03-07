import { useRouter } from 'next/router'
import { ApiService } from '@/services/ApiService'
import { CookieService, CookieTypes } from '@/utils/CookieService'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

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

interface IUserCreateDTO {
  username: string
  email: string
  password: string
}

interface UserContextData {
  user: IUserGetResponse | null
  error: string | null
  isLogged: boolean
  isLoading: boolean
  userLogin(userLogin: IUserLoginDTO): Promise<void>
  userCreate(userData: IUserCreateDTO): Promise<void>
  userLogout(): Promise<void>
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<IUserGetResponse | null>(null)
  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const userLogout = useCallback(async (): Promise<void> => {
    setUser(null)
    setError(null)
    setIsLogged(false)
    destroyCookies()
    router.push('/login')
  }, [router])

  const withClientSession = useCallback(async () => {
    if (!hasCookies()) {
      router.push('/')
    }
  }, [router])

  const checkUserIsLogged = useCallback(async (): Promise<void> => {
    try {
      if (!hasCookies()) {
        return
      }

      const responseValidateOrError = await ApiService.token.validate()
      if (responseValidateOrError.isLeft()) {
        throw responseValidateOrError.value
      }

      const user = CookieService.get({
        name: CookieTypes.USER,
      })

      setUser(JSON.parse(user))
    } catch (error) {
      console.log(error)
      router.push('/')
    }
  }, [router])

  const hasCookies = (): boolean => {
    return (
      CookieService.has({ name: CookieTypes.TOKEN }) &&
      CookieService.has({ name: CookieTypes.USER })
    )
  }

  const userLogin = useCallback(
    async ({ username, password }: IUserLoginDTO): Promise<void> => {
      try {
        setError(null)
        setIsLoading(true)

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

        await router.push('/conta')

        setIsLogged(true)
        setUser(user)
      } catch (error) {
        if (error instanceof Error) setError('Usuário inválido')
        setIsLogged(false)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const userCreate = useCallback(
    async (userData: IUserCreateDTO) => {
      try {
        await ApiService.user.post(userData)

        await userLogin({
          username: userData.username,
          password: userData.password,
        })
      } catch {
        setError('Erro ao criar usuário')
      }
    },
    [userLogin],
  )

  const destroyCookies = (): void => {
    console.log('destroy')
    CookieService.destroy({ name: CookieTypes.TOKEN })
    CookieService.destroy({ name: CookieTypes.USER })
  }

  useEffect(() => {
    checkUserIsLogged()
  }, [checkUserIsLogged])

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userCreate,
        userLogout,
        error,
        isLoading,
        isLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
