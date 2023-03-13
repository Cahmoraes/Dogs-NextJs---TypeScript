import { styled, keyframes } from '@/styles/stitches.config'
import ImageNext from 'next/image'
import LinkNext from 'next/link'
import visualizationBlackIcon from '@/assets/images/visualizacao-black.svg'

const scaleUp = keyframes({
  to: {
    opacity: 'initial',
    transform: 'initial',
  },
})

export const PhotoContentContainer = styled('div', {
  margin: 'auto',
  height: '36rem',
  borderRadius: '.2rem',
  background: '#fff',
  display: 'grid',
  gridTemplateColumns: '36rem 20rem',
  gridTemplateRows: 'auto 1fr auto',
  overflow: 'hidden',

  '@media(max-width: 64rem)': {
    '&': {
      height: 'auto',
      maxHeight: 'calc(100vh - 4rem)',
      overflowY: 'auto',
      gridTemplateColumns: 'minmax(20rem, 40rem)',
    },
  },

  '&[data-single="true"]': {
    gridTemplateColumns: '1fr',
    height: 'auto',
  },
})

export const PhotoContentContainerSkeleton = styled('div', {
  margin: 'auto',
  height: '36rem',
  width: '36rem',
  borderRadius: '.2rem',
  background: '#fff',
  display: 'block',
  opacity: 0,
  transform: 'scale(0.8)',
  animation: `${scaleUp} .3s forwards`,

  '@media(max-width: 40rem)': {
    '&': {
      height: '22rem',
      width: '22rem',
    },
  },
})

export const Image = styled(ImageNext, {
  width: '100%',
  height: '100%',
  gridRow: '1/4',

  '@media(max-width: 64rem)': {
    gridRow: '1',
  },

  '[data-single="true"] &': {
    gridRow: 1,
    borderRadius: '.4rem',
    overflow: 'hidden',
  },
})

export const Details = styled('div', {
  padding: '2rem 2rem 0 2rem',

  '[data-single="true"] &': {
    padding: '1rem 0 0 0',
  },
})

export const Author = styled('div', {
  opacity: '.5',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Link = styled(LinkNext, {
  '&:hover': {
    textDecoration: 'underline',
  },
})

export const Visualizations = styled('span', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&::before': {
    content: '',
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginRight: '.5rem',
    background: `url(${visualizationBlackIcon.src}) center center no-repeat`,
  },
})

export const Attributes = styled('ul', {
  display: 'flex',
  fontSize: '1.125rem',
  fontWeight: 'bold',
  marginTop: '1rem',
  marginBottom: '2rem',
})

export const Attribute = styled('li', {
  marginRight: '2rem',

  '&::before': {
    content: '',
    display: 'inline-block',
    height: 20,
    width: 2,
    marginRight: '.5rem',
    position: 'relative',
    top: 3,
    background: '#333',
    marginTop: 5,
  },
})
