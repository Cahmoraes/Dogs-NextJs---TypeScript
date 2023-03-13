import { Feed } from '@/components/Feed'
import { Head } from '@/components/Head'
import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withClientSession } from '@/utils/decorators/withClientSession'

function Home() {
  return (
    <div className="container main-container">
      <Head description="Home do site Dogs, com o feed de fotos.">Fotos</Head>
      <Feed />
    </div>
  )
}

export default applyDecorators(Home, withClientSession)
