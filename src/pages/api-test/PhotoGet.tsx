import { AxiosError } from 'axios'
import { api } from '@/services/ApiService'
import { useState, FormEvent } from 'react'

export default function PhotoGet() {
  const [id, setId] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      await api.get(`/photo/${id}`)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="nome"
      />

      <br />
      <button type="submit">Enviar</button>
    </form>
  )
}
