import { CookieService } from '@/utils/CookieService'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface HomeProps {
  session: boolean
}

export default function Home({ session }: HomeProps) {
  console.log({ session })
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export function withSession<T extends Function>(callback: T) {
  return async (ctx: GetServerSidePropsContext) => {
    const userCookie = CookieService.get({
      name: '@Dogs:token',
      ctx: { req: ctx.req, res: ctx.res },
    })

    const newContext = {
      ...ctx,
      session: userCookie || null,
    }

    return callback(newContext)
  }
}

interface ISession extends GetServerSidePropsContext {
  session: string | null
}

export const getServerSideProps: GetServerSideProps = withSession(
  async (ctx: ISession) => {
    return {
      props: {
        session: ctx.session,
      },
    }
  },
)
