import { ReactElement } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import * as S from './styles'

interface DialogProps {
  isOpen: boolean
  onOpenChange(state: boolean): void
  component: ReactElement | null
}
export function Dialog({ isOpen, onOpenChange, component }: DialogProps) {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <S.Overlay />
        <S.Content>{component}</S.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
