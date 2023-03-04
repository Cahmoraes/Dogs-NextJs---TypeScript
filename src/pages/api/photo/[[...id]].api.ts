import { AxiosError } from 'axios'
import { dogApi } from '@/services'
import { assertsMethod } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse } from 'next'
import { MethodNotPermittedException } from '../utils/MethodNotPermittedException'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['GET'])
    const id = req.query.id ? String(req.query.id) : null
    console.log(id)

    const response = await dogApi.get(getPathPhoto(id))

    return res.json({ data: response.data })
  } catch (error) {
    if (error instanceof MethodNotPermittedException) {
      return res.status(403).json({ error: error.message })
    }

    if (error instanceof AxiosError) {
      return res.status(error.status || 403).json({ error: error.message })
    }

    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(500).json({ error })
  }
}

function getPathPhoto(id: string | null) {
  return id ? `/api/photo/${id}` : '/api/photo'
}
