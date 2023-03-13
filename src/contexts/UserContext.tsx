import { useRouter } from 'next/router'
import { ApiService } from '@/services/ApiService'
import { CookieService } from '@/utils/CookieService'
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const isLogged = !!user

  const logout = useCallback(async (): Promise<void> => {
    try {
      destroyCookies()
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
        resetStates()
        return false
      }

      const responseValidateOrError = await ApiService.token.validate()

      if (responseValidateOrError.isLeft()) {
        throw responseValidateOrError.value
      }

      const user = CookieService.get({
        name: 'USER',
      })

      setUser(JSON.parse(user))
      return true
    } catch (error) {
      setUser(null)
      console.log(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const hasCookies = (): boolean => {
    return (
      CookieService.has({ name: 'TOKEN' }) &&
      CookieService.has({ name: 'USER' })
    )
  }

  const resetStates = () => {
    setIsLoading(true)
    setUser(null)
    setError(null)
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
          name: 'TOKEN',
          value: token,
        })

        const { data: user } = await ApiService.user.get()
        CookieService.set({
          name: 'USER',
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
    CookieService.destroy({ name: 'TOKEN' })
    CookieService.destroy({ name: 'USER' })
  }

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
