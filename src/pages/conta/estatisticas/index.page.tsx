import { createGetServerSidePropsWithAuth } from '@/utils/withAuth'
import { AccountLayout } from '../layout'

export default function UserStats() {
  return (
    <AccountLayout>
      <div>UserStats</div>
    </AccountLayout>
  )
}

// export const getServerSideProps = createGetServerSidePropsWithAuth()
