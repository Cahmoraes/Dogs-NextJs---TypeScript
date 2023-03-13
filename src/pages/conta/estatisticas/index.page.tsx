import { applyDecorators } from '@/utils/decorators/applyDecorators'
import { withClientSession } from '@/utils/decorators/withClientSession'
import { withAccountLayout } from '@/utils/decorators/withLayout'
import { useEffect, useState } from 'react'
import { ApiService, IStatsGet } from '@/services/ApiService'
import { Error as ErrorComponent } from '@/components/Error'
import { UserStatsGraphs } from './components/UserStatsGraphs'

const UserStatsComponent = () => {
  const [data, setData] = useState<IStatsGet[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await ApiService.stats.get()
        setData(response)
        console.log(response)
      } catch (error) {
        console.log(error)
        setData([])
        setError('Não foi possível obter as estatísticas')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) return <div>Carregando...</div>
  if (error) return <ErrorComponent message={error} />
  if (data.length > 0)
    return (
      <div>
        <UserStatsGraphs data={data} />
      </div>
    )
  return null
}

export default applyDecorators(
  UserStatsComponent,
  withAccountLayout,
  withClientSession,
)
