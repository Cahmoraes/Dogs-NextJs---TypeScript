import { withClientSession } from '@/utils/withClientSession'
import { withAccountLayout } from '@/utils/withLayout'
import { UserContainer } from './styles'

function Account() {
  return (
    <UserContainer>
      <p>Minha conta</p>
    </UserContainer>
  )
}

export default withClientSession(withAccountLayout(Account))
