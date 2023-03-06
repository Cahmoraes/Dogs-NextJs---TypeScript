import { dogApi } from '@/services/ApiService'
import { assertsMethod } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../utils/errorHandler'

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
    return errorHandler(error, res)
  }
}

function getPathPhoto(id: string | null) {
  return id ? `/api/photo/${id}` : '/api/photo'
}
