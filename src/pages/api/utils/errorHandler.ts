import { AxiosError } from 'axios'
import { NextApiResponse } from 'next'
import { MethodNotPermittedException } from './MethodNotPermittedException'

export function errorHandler(error: unknown, res: NextApiResponse) {
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
