import { useRouter } from 'next/router'

const titleMap = {
  '/conta': 'Minha Conta',
  '/conta/estatisticas': 'Estatísticas',
  '/conta/postar': 'Poste a sua foto',
}

type TitleType = typeof titleMap

export function useAccountTitle(): string {
  const router = useRouter()
  const pathName = router.pathname as keyof TitleType
  return titleMap[pathName] ?? 'Conta'
}
