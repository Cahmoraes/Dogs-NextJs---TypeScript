import { dogApi } from '@/services/ApiService'
import { assertsMethod } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse } from 'next'
import { CookieService } from '@/utils/CookieService'
import { errorHandler } from '../utils/errorHandler'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['GET'])

    const userToken = CookieService.get({
      name: 'TOKEN',
      ctx: { req, res },
    })

    const response = await dogApi.post(
      '/jwt-auth/v1/token/validate',
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )

    return res.json(response.data)
  } catch (error) {
    return errorHandler(error, res)
  }
}
