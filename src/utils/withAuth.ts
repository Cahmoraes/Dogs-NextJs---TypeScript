import { ApiService } from '@/services/ApiService'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from './getSession'

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

      const newContext = getSession(ctx)

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

export function createGetServerSidePropsWithAuth(redirectDestination = '/') {
  return withAuth(async (ctx: ISession) => {
    return {
      props: {
        session: ctx.session,
      },
    }
  }, redirectDestination)
}
