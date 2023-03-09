import { styled } from '@/styles/stitches.config'

export const FeedPhotosContainer = styled('ul', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  justifyItems: 'center',

  '@media(max-width: 40rem)': {
    '&': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
})
