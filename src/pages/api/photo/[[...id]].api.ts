import { dogApi } from '@/services/ApiService'
import { assertsMethod, MethodTypes } from '@/pages/api/utils/assertsMethod'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../utils/errorHandler'
import { CookieService } from '@/utils/CookieService'

type HandlersType = Record<MethodTypes, NextApiHandler>

const handlers: HandlersType = {
  async GET(req, res) {
    const id = req.query.id ? String(req.query.id) : null
    const { data } = await dogApi.get(getPathPhoto(id))
    return res.json(data)
  },

  async POST(req, res) {
    const userData = req.body
    const response = await dogApi.post('/api/user', userData)
    return res.json({ data: response.data })
  },

  async DELETE(req, res) {
    const { id } = req.query
    const userToken = CookieService.get({
      name: 'TOKEN',
      ctx: { req, res },
    })

    const { data } = await dogApi.delete(`/api/photo/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })

    return res.json(data)
  },
  async PUT(req, res) {},
  async PATCH(req, res) {},
} as const

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['GET', 'DELETE'])
    return handlers[req.method](req, res)
  } catch (error) {
    return errorHandler(error, res)
  }
}

function getPathPhoto(id: string | null) {
  return id ? `/api/photo/${id}` : '/api/photo'
}
