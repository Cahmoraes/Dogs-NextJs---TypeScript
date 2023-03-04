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
    assertsMethod(req.method, ['POST'])

    const userData = req.body
    const response = await dogApi.post('/jwt-auth/v1/token', userData)

    return res.json({ token: response.data.token })
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
