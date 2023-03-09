// import { createGetServerSidePropsWithAuth } from '@/utils/withAuth'
// import { withSkeleton } from '@/utils/withSkeleton'
import { withClientSession } from '@/utils/withClientSession'
import { withAccountLayout } from '@/utils/withLayout'

const UserStatsComponent = () => {
  return (
    <div>
      <p>Estatísticas</p>
    </div>
  )
}

export default withClientSession(withAccountLayout(UserStatsComponent))
// export const getServerSideProps = createGetServerSidePropsWithAuth()
