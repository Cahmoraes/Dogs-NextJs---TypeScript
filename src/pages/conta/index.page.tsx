import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withClientSession } from '@/utils/decorators/withClientSession'
import { withAccountLayout } from '@/utils/decorators/withLayout'
import { UserContainer } from './styles'

function Account() {
  return (
    <UserContainer>
      <p>Minha conta</p>
    </UserContainer>
  )
}

export default applyDecorators(Account, withAccountLayout, withClientSession)
