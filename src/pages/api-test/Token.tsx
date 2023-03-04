import { AxiosError } from 'axios'
import { api } from '@/services'
import { useState, FormEvent } from 'react'

export default function Token() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const response = await api.post('/token', {
        username,
        password,
      })

      setToken(response.data.token)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <br />
      <button type="submit">Enviar</button>
      <br />
      <p style={{ wordBreak: 'break-all' }}>{token}</p>
    </form>
  )
}
