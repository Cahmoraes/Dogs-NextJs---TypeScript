import { AxiosError } from 'axios'
import { dogApi } from '@/services'
import { assertsMethod, MethodTypes } from '@/pages/api/utils/assertsMethod'
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { MethodNotPermittedException } from '../utils/MethodNotPermittedException'
import { CookieService } from '@/utils/CookieService'

type HandlersType = Record<MethodTypes, NextApiHandler>

const handlers: HandlersType = {
  async GET(req, res) {
    const userToken = CookieService.get({
      name: '@Dogs:token',
      ctx: { req, res },
    })

    const response = await dogApi.get('/api/user', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return res.json(response.data)
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
