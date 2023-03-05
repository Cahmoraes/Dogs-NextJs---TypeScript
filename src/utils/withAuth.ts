import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CookieService } from './CookieService'

export function withAuth<T extends Function>(
  callback: T,
  redirectDestination = '/',
): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const userCookie = CookieService.get({
        name: '@Dogs:token',
        ctx: { req: ctx.req, res: ctx.res },
      })

      const newContext = {
        ...ctx,
        session: userCookie || null,
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
