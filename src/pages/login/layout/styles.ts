import { styled } from '@/styles/stitches.config'
import loginImage from '../../../assets/images/login.jpg'

export const LayoutContainer = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  minHeight: '100vh',
  gap: '2rem',

  '&::before': {
    content: '',
    display: 'block',
    // background: `url(https://source.unsplash.com/random/1200x1600/?dog) no-repeat center center`,
    background: `url(${loginImage.src}) no-repeat center center`,
    backgroundSize: 'cover',
  },

  '@media (max-width: 40rem)': {
    '&': {
      gridTemplateColumns: '1fr',

      '&::before': {
        display: 'none',
      },
    },
  },
})

export const FormsContainer = styled('div', {
  maxWidth: '30rem',
  padding: '1rem',

  '@media (max-width: 40rem)': {
    '&': {
      maxWidth: '100%',
    },
  },
})
