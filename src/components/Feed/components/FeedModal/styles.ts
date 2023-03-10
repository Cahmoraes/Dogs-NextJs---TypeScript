import { styled } from '@/styles/stitches.config'

export const FeedModalContainer = styled('div', {
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
