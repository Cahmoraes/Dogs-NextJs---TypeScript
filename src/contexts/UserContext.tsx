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
  login(userLogin: IUserLoginDTO): Promise<void>
  create(userData: IUserCreateDTO): Promise<void>
  logout(): Promise<void>
  checkUserIsLogged(): Promise<boolean>
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<IUserGetResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const isLogged = !!user

  const logout = useCallback(async (): Promise<void> => {
    try {
      destroyCookies()
      console.log('userLogout hasCookies()', hasCookies())
      setUser(null)
      setError(null)
      await router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }, [router])

  const checkUserIsLogged = useCallback(async (): Promise<boolean> => {
    try {
      if (!hasCookies()) {
        setIsLoading(false)
        setUser(null)
        setError(null)
        return false
      }

      const responseValidateOrError = await ApiService.token.validate()
      if (responseValidateOrError.isLeft()) {
        throw responseValidateOrError.value
      }

      const user = CookieService.get({
        name: CookieTypes.USER,
      })

      if (!user) {
        throw new Error('User not found')
      }

      setUser(JSON.parse(user))
      return true
    } catch (error) {
      setIsLoading(false)
      setUser(null)
      console.log(error)
      router.push('/')
      return false
    }
  }, [router])

  const hasCookies = (): boolean => {
    return (
      CookieService.has({ name: CookieTypes.TOKEN }) &&
      CookieService.has({ name: CookieTypes.USER })
    )
  }

  const login = useCallback(
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
        setUser(user)
      } catch (error) {
        if (error instanceof Error) setError('Usuário inválido')

        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const create = useCallback(
    async (userData: IUserCreateDTO) => {
      try {
        await ApiService.user.post(userData)

        await login({
          username: userData.username,
          password: userData.password,
        })
      } catch {
        setError('Erro ao criar usuário')
      }
    },
    [login],
  )

  const destroyCookies = (): void => {
    CookieService.destroy({ name: CookieTypes.TOKEN })
    CookieService.destroy({ name: CookieTypes.USER })
  }

  useEffect(() => {
    ;(async () => {
      await checkUserIsLogged()
    })()
  }, [checkUserIsLogged])

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        create,
        logout,
        checkUserIsLogged,
        error,
        isLoading,
        isLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
