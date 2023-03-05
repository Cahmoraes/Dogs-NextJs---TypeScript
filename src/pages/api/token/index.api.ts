import { dogApi } from '@/services'
import { assertsMethod } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../utils/errorHandler'

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
    return errorHandler(error, res)
  }
}
