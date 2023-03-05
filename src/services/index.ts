import axios from 'axios'

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

interface IUserGetResponse {
  id: number
  username: string
  nome: string
  email: string
}

export class ApiService {
  static async getToken({ username, password }: ITokenDTO) {
    return await api.post('/token', {
      username,
      password,
    })
  }

  static async validateToken() {
    return await api.get('/token/validate')
  }

  static async userGet() {
    return await api.get<IUserGetResponse>('/user')
  }
}
