import { Feed } from '@/components/Feed'
import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withClientSession } from '@/utils/decorators/withClientSession'

function Home() {
  return (
    <div className="container main-container">
      <Feed />
    </div>
  )
}

export default applyDecorators(Home, withClientSession)
