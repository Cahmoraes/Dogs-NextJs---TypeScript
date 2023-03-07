import { ApiService } from '@/services/ApiService'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CookieService, CookieTypes } from './CookieService'

export function withAuth<T extends Function>(
  callback: T,
  redirectDestination = '/',
): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const responseValidateOrError = await ApiService.token.validate(ctx)
      if (responseValidateOrError.isLeft()) {
        throw responseValidateOrError.value
      }

      const token = CookieService.get({
        name: CookieTypes.TOKEN,
        ctx: { req: ctx.req, res: ctx.res },
      })

      const user = CookieService.get({
        name: CookieTypes.USER,
        ctx: { req: ctx.req, res: ctx.res },
      })

      const session = {
        token,
        user: JSON.parse(user),
      }

      const newContext = {
        ...ctx,
        session,
      }

      return callback(newContext)
    } catch (error) {
      console.log('withAuth', error)

      return {
        redirect: {
          destination: redirectDestination,
          permanent: false,
        },
      }
    }
  }
}

export interface ISession extends GetServerSidePropsContext {
  session: string | null
  user: string | null
}

export function createGetServerSidePropsWithAuth(redirectPath = '/') {
  return withAuth(
    async (ctx: ISession) => {
      return {
        props: {
          session: ctx.session,
        },
      }
    },
    { redirectPath },
  )
}
