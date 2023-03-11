import { IncomingMessage, ServerResponse } from 'http'
import { CookieService } from './CookieService'

interface IContext {
  req: IncomingMessage
  res: ServerResponse
}

export function getSession(ctx?: IContext) {
  const token = CookieService.get({
    name: 'TOKEN',
    ctx: { req: ctx?.req, res: ctx?.res },
  })

  const user = CookieService.get({
    name: 'USER',
    ctx: { req: ctx?.req, res: ctx?.res },
  })

  const session = {
    token,
    user: JSON.parse(user),
  }

  const newContext = {
    ...ctx,
    session,
  }

  return newContext
}
