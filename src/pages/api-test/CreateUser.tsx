import { AxiosError } from 'axios'
import { api } from '@/services/ApiService'
import { useState, FormEvent } from 'react'

export default function CreateUser() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      await api.post('/user', {
        username,
        email,
        password,
      })
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
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <br />
      <button type="submit">Enviar</button>
    </form>
  )
}
