import { AxiosError } from 'axios'
import { dogApi } from '@/services'
import { useState, FormEvent } from 'react'

export default function PhotoPost() {
  const [token, setToken] = useState('')
  const [nome, setNome] = useState('')
  const [peso, setPeso] = useState('')
  const [idade, setIdade] = useState('')
  const [img, setImg] = useState<File | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('peso', peso)
    formData.append('idade', idade)
    formData.append('img', img!)

    try {
      const response = await dogApi.post('/api/photo', formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response)
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
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="token"
      />

      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="nome"
      />

      <input
        type="text"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        placeholder="peso"
      />

      <input
        type="text"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        placeholder="idade"
      />

      <input
        type="file"
        onChange={({ target }) => setImg(target.files!.item(0))}
      />

      <br />
      <button type="submit">Enviar</button>
    </form>
  )
}
