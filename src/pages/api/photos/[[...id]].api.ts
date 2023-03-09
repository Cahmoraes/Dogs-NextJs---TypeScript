import { dogApi } from '@/services/ApiService'
import { assertsMethod } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../utils/errorHandler'
import { z } from 'zod'

const photoQuerySchema = z.object({
  _page: z.string(),
  _total: z.string(),
  _user: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['GET'])
    const { _page, _total, _user } = photoQuerySchema.parse(req.query)

    const { data } = await dogApi.get(
      `/api/photo/?_page=${_page}&&_total=${_total}&_user=${_user}`,
      {
        headers: {
          cache: 'no-store',
        },
      },
    )

    return res.json(data)
  } catch (error) {
    return errorHandler(error, res)
  }
}
