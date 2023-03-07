// import { createGetServerSidePropsWithAuth } from '@/utils/withAuth'
import { withClientSession } from '@/utils/withClientSession'
import { AccountLayout } from '../layout'

const UserStatsComponent = () => {
  return (
    <AccountLayout>
      <div>UserStats</div>
    </AccountLayout>
  )
}

export default withClientSession(UserStatsComponent)

// export const getServerSideProps = createGetServerSidePropsWithAuth()
