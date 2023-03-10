import { dogApi } from '@/services/ApiService'
import { assertsMethod } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../utils/errorHandler'
import { CookieService, CookieTypes } from '@/utils/CookieService'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['POST'])
    const id = req.query.id ? String(req.query.id) : null
    const { comment } = req.body

    const userToken = CookieService.get({
      name: CookieTypes.TOKEN,
      ctx: { req, res },
    })

    const { data } = await dogApi.post(
      `/api/comment/${id}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )

    return res.json(data)
  } catch (error) {
    console.log(error)
    return errorHandler(error, res)
  }
}
