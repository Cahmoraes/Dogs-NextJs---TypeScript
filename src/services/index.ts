import { CookieService, CookieTypes } from '@/utils/CookieService'
import axios, { AxiosError } from 'axios'

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

export class ApiService {
  static get token() {
    return {
      async get({ username, password }: ITokenDTO) {
        return await api.post<string>('/token', {
          username,
          password,
        })
      },

      async validate(ctx = {}) {
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

          // console.log({ data })

          return data
        } catch (error) {
          console.log(error)
          return error
        }
      },
    }
  }

  static get user() {
    return {
      async get() {
        return await api.get<IUserGetResponse>('/user')
      },
    }
  }
}
