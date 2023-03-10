import { keyframes, styled } from '@/styles/stitches.config'
import * as RadixDialog from '@radix-ui/react-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const Overlay = styled(RadixDialog.Root, {
  background: 'rgba(0, 0, 0, 0.4)',
  position: 'fixed',
  zIndex: 99999,
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const Content = styled(RadixDialog.Content, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.4)',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'grid',
  placeContent: 'center',
  padding: '2rem calc(4rem + 15px ) 2rem 4rem',

  '@media (max-width: 40rem)': {
    '&': {
      padding: '2rem calc(2rem + 15px ) 2rem 2rem',
    },
  },
})
