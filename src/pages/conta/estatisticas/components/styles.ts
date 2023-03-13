import { styled } from '@/styles/stitches.config'

export const UserStatsContainer = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  marginBottom: '2rem',

  '@media (max-width: 40rem)': {
    gridTemplateColumns: '1fr',
  },
})

export const GraphItem = styled('div', {
  boxShadow: '0 10px 20px rgba(0,0,0, .1)',
  display: 'grid',
  borderRadius: '0.2rem',
  alignItems: 'center',

  '&:first-of-type': {
    gridColumn: '1 / 3',
  },
})

export const Total = styled('p', {
  padding: '2rem',
  fontSize: '2rem',

  '@media (max-width: 40rem)': {
    gridColumn: '1',
  },
})
