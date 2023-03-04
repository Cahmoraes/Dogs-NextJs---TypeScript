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
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<IUserGetResponse | null>(null)
  const [login, setLogin] = useState(false)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const response = await ApiService.tokenValidade()
  //       console.log(response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()
  // }, [])

  const userLogin = useCallback(
    async ({ username, password }: IUserLoginDTO) => {
      try {
        const tokenResponse = await ApiService.token({ username, password })
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
