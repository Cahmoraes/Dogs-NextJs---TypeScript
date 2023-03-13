import axios, { AxiosError } from 'axios'
import { CookieService } from '@/utils/CookieService'
import { Either, EitherType } from '@cahmoraes93/either'
import { IComment } from '@/components/Feed/interfaces/IPhoto'

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

export interface IPhotosDTO {
  page: number
  total: number
  user: number | string
}

interface IPhotoDTO {
  id: number
}

interface IPhoto {
  acessos: string
  author: string
  id: number
  idade: string
  peso: string
  src: string
  title: string
  total_comments: string
}

interface IPhotoResponse {
  photo: IPhoto
  comments: any[]
}

export interface IUserPostRequest {
  username: string
  email: string
  password: string
}

interface ICommentPost {
  photoId: number
  comment: string
}

interface IPasswordLostDTO {
  login: string
  url: string
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
            name: 'TOKEN',
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
        const token = CookieService.get({ name: 'TOKEN' })

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

      async get({ id }: IPhotoDTO) {
        try {
          const response = await api.get<IPhotoResponse>(`/photo/${id}`)
          return response.data
        } catch (error) {
          console.log(error)

          if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
          }

          throw error
        }
      },

      async delete({ id }: IPhotoDTO) {
        try {
          await api.delete(`/photo/${id}`)
        } catch (error) {
          console.log(error)

          if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
          }

          throw error
        }
      },
    }
  }

  static get photos() {
    return {
      async get({ page, total, user }: IPhotosDTO) {
        try {
          const response = await api.get<IPhoto[]>(
            `/photos/?_page=${page}&&_total=${total}&_user=${user}`,
          )
          return response.data
        } catch (error) {
          console.log(error)

          if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
          }

          throw error
        }
      },
    }
  }

  static get comment() {
    return {
      async post({ photoId, comment }: ICommentPost) {
        try {
          const response = await api.post<IComment>(`/comment/${photoId}`, {
            comment,
          })
          return response.data
        } catch (error) {
          console.log(error)

          if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
          }

          throw error
        }
      },
    }
  }

  static get lostPassword() {
    return {
      async post({ login, url }: IPasswordLostDTO) {
        try {
          const { data } = await api.post<string>('/password/lost', {
            login,
            url,
          })
          return data
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
          }

          throw error
        }
      },
    }
  }
}
