import axios, { AxiosError } from 'axios'
import { CookieService, CookieTypes } from '@/utils/CookieService'
import { Either, EitherType } from '@cahmoraes93/either'

export const api = axios.create({
  baseURL: '/api',
})

export const dogApi = axios.create({
  baseURL: 'https://dogsapi.origamid.dev/json',
})

interface ITokenDTO {
  username: string
  password: string
}

export interface IUserGetResponse {
  id: number
  username: string
  nome: string
  email: string
}

export interface IUserPostRequest {
  username: string
  email: string
  password: string
}

export class ApiService {
  static get token() {
    return {
      async get({ username, password }: ITokenDTO) {
        return await api.post<string>('/token', {
          username,
          password,
        })
      },

      async validate(ctx = {}): Promise<EitherType<any, string>> {
        try {
          const token = CookieService.get({
            name: CookieTypes.TOKEN,
            ctx,
          })

          const { data } = await dogApi.post(
            '/jwt-auth/v1/token/validate',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          return Either.right(data)
        } catch (error) {
          console.log(error)
          return Either.left(error)
        }
      },
    }
  }

  static get user() {
    return {
      async get() {
        return await api.get<IUserGetResponse>('/user')
      },

      async post(userData: IUserPostRequest) {
        return await api.post<IUserGetResponse>('/user', userData)
      },
    }
  }

  static get photo() {
    return {
      async post(formData: FormData) {
        const token = CookieService.get({ name: CookieTypes.TOKEN })

        try {
          await dogApi.post('/api/photo', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
          }
        }
      },
    }
  }
}
