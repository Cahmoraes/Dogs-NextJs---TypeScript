import { styled } from '@/styles/stitches.config'

export const TitleContainer = styled('h1', {
  fontFamily: '$--type-second',
  lineHeight: 1,
  fontSize: '3rem',
  margin: '1rem 0',
  position: 'relative',
  zIndex: 1,

  '&::after': {
    content: '',
    display: 'block',
    width: '1.5rem',
    height: '1.5rem',
    background: '#fb8',
    position: 'absolute',
    bottom: 5,
    left: -5,
    borderRadius: '.2rem',
    zIndex: -1,
  },
})
