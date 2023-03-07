// import { createGetServerSidePropsWithAuth } from '@/utils/withAuth'
import { withClientSession } from '@/utils/withClientSession'
import { AccountLayout } from '../layout'

const UserStatsComponent = () => {
  return (
    <AccountLayout>
      <div>
        <p>Estatísticas</p>
      </div>
    </AccountLayout>
  )
}

export default withClientSession(UserStatsComponent)

// export const getServerSideProps = createGetServerSidePropsWithAuth()
