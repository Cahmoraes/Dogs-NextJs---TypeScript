import { withClientSession } from '@/utils/withClientSession'
import { AccountLayout } from './layout'
import { UserContainer } from './styles'

function Account() {
  return (
    <AccountLayout>
      <UserContainer>
        <p>Minha conta</p>
      </UserContainer>
    </AccountLayout>
  )
}

export default withClientSession(Account)
