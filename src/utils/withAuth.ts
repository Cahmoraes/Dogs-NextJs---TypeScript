import { ApiService } from '@/services'
import { AxiosError } from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CookieService, CookieTypes } from './CookieService'

export function withAuth<T extends Function>(
  callback: T,
  redirectDestination = '/',
): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const responseValidade = await ApiService.token.validate(ctx)
      if (responseValidade instanceof AxiosError) {
        throw responseValidade
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
          destination: '/',
          permanent: false,
        },
      }
    }
  }
}
