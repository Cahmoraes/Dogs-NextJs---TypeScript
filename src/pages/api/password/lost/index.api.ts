import { dogApi } from '@/services/ApiService'
import { assertsMethod, MethodTypes } from '@/pages/api/utils/assertsMethod'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../../utils/errorHandler'

type HandlersType = Record<MethodTypes, NextApiHandler>

const handlers: HandlersType = {
  async POST(req, res) {
    const { login, url } = req.body

    const { data } = await dogApi.post('/api/user', { login, url })
    return res.json(data)
  },

  async GET(req, res) {},
  async DELETE(req, res) {},
  async PUT(req, res) {},
  async PATCH(req, res) {},
} as const

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    assertsMethod(req.method, ['POST'])
    return handlers[req.method](req, res)
  } catch (error) {
    return errorHandler(error, res)
  }
}
