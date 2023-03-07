import { createGetServerSidePropsWithAuth } from '@/utils/withAuth'
import { AccountLayout } from './layout'
import { UserContainer } from './styles'

export default function Account() {
  return (
    <AccountLayout>
      <UserContainer>User</UserContainer>
    </AccountLayout>
  )
}

export const getServerSideProps = createGetServerSidePropsWithAuth()
