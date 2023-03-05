import { ApiService } from '@/services'
import { CookieService } from '@/utils/CookieService'
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

interface UserContextData {
  user: IUserGetResponse | null
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
  const [error, setError] = useState<any>(null)

  const getUser = useCallback(async () => {
    try {
      if (!CookieService.has({ name: '@Dogs:token' })) {
        return
      }

      setError(null)
      setLogin(true)

      await ApiService.validateToken()
      const userResponse = await ApiService.userGet()
      setUser(userResponse.data)
      console.log('userResponse', userResponse.data)
    } catch (error) {
      console.log(error)
      CookieService.destroy({ name: '@Dogs:token' })
      setError(error)
    }
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  const userLogout = useCallback(async () => {
    setUser(null)
    setError(null)
    setLogin(false)

    CookieService.destroy({ name: '@Dogs:token' })
  }, [])

  const userLogin = useCallback(
    async ({ username, password }: IUserLoginDTO) => {
      try {
        const tokenResponse = await ApiService.getToken({ username, password })
        const { token } = tokenResponse.data

        CookieService.set({
          name: '@Dogs:token',
          value: token,
        })

        const userResponse = await ApiService.userGet()
        console.log(userResponse.data)

        setUser(userResponse.data)
        setLogin(true)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
