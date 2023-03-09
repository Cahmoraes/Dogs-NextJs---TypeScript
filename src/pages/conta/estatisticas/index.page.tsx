import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withClientSession } from '@/utils/decorators/withClientSession'
import { withAccountLayout } from '@/utils/decorators/withLayout'

const UserStatsComponent = () => {
  return (
    <div>
      <p>Estatísticas</p>
    </div>
  )
}

export default applyDecorators(
  UserStatsComponent,
  withAccountLayout,
  withClientSession,
)
