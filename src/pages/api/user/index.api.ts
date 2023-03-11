import { dogApi } from '@/services/ApiService'
import { assertsMethod, MethodTypes } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { CookieService } from '@/utils/CookieService'
import { errorHandler } from '../utils/errorHandler'

type HandlersType = Record<MethodTypes, NextApiHandler>

const handlers: HandlersType = {
  async GET(req, res) {
    const userToken = CookieService.get({
      name: 'TOKEN',
      ctx: { req, res },
    })

    const { data } = await dogApi.get('/api/user', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })

    return res.json(data)
  },

  async POST(req, res) {
    const userData = req.body
    const response = await dogApi.post('/api/user', userData)
    return res.json({ data: response.data })
  },

  async DELETE(req, res) {},
  async PUT(req, res) {},
  async PATCH(req, res) {},
} as const

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['POST', 'GET'])
    return handlers[req.method](req, res)
  } catch (error) {
    return errorHandler(error, res)
  }
}
