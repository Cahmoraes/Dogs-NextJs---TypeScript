import { styled } from '@/styles/stitches.config'
import visualizacao from '@/assets/images/visualizacao.svg'

export const Access = styled('span', {
  gridArea: '1/1',
  background: 'rgba(0, 0, 0, .3)',
  color: '#fff',
  textAlign: 'center',
  display: 'none',
  placeContent: 'center',
  gridTemplateColumns: 'auto auto',
  alignItems: 'center',

  '&::before': {
    content: '',
    display: 'inline-block',
    width: 16,
    height: 10,
    marginRight: '.25rem',
    background: `url(${visualizacao.src}) center center no-repeat`,
  },
})

export const FeedPhotosItemContainer = styled('li', {
  display: 'grid',
  borderRadius: '0.2rem',
  overflow: 'hidden',
  cursor: 'pointer',
  width: '100%',
  height: '100%',

  '&:nth-child(2)': {
    gridColumn: '2/4',
    gridRow: 'span 2',
  },

  img: {
    gridArea: '1/1',
    display: 'block',
    width: '100%',
    height: '100%',
  },

  '@media (max-width: 40rem)': {
    '&:nth-child(2)': {
      gridColumn: 'initial',
      gridRow: 'initial',
    },
  },

  [`&:hover ${Access}`]: {
    display: 'grid',
  },
})
