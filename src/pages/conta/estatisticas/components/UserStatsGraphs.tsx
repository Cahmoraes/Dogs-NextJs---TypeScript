import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { IStatsGet } from '@/services/ApiService'
import * as S from './styles'

const VictoryChart = dynamic(
  () => import('victory').then((mod) => mod.VictoryChart),
  {
    ssr: false,
  },
)

const VictoryPie = dynamic(
  () => import('victory').then((mod) => mod.VictoryPie),
  {
    ssr: false,
  },
)

const VictoryBar = dynamic(
  () => import('victory').then((mod) => mod.VictoryBar),
  {
    ssr: false,
  },
)

interface UserStatsGraphsProps {
  data: IStatsGet[]
}

export function UserStatsGraphs({ data }: UserStatsGraphsProps) {
  const graph = useMemo(
    () =>
      data.map((item) => ({
        x: item.title,
        y: Number(item.acessos),
      })),
    [data],
  )

  const total = useMemo(
    () =>
      data
        .map((data) => Number(data.acessos))
        .reduce((acc, acesso) => acc + acesso),
    [data],
  )

  return (
    <S.UserStatsContainer className="animeLeft">
      <S.GraphItem>
        <S.Total>Acessos: {total}</S.Total>
      </S.GraphItem>

      <S.GraphItem>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </S.GraphItem>

      <S.GraphItem>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </S.GraphItem>
    </S.UserStatsContainer>
  )
}
