import { withAuth } from '@/utils/withAuth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface AccountProps {
  session: string | null
}

export default function Account({ session }: AccountProps) {
  // console.log(session)

  return (
    <div>
      <h1>Minha conta</h1>
    </div>
  )
}

interface ISession extends GetServerSidePropsContext {
  session: string | null
  user: string | null
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: ISession) => {
    return {
      props: {
        session: ctx.session,
      },
    }
  },
)
