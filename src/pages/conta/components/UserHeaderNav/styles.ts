import { styled } from '@/styles/stitches.config'

export const UserHeaderNavContainer = styled('nav', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',

  '& > a, & > button': {
    background: '#eee',
    borderRadius: '.2rem',
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: '0.1s',
  },

  '& > a:hover, & > a:focus, & > button:hover, & > button:focus': {
    background: '#fff',
    boxShadow: '0 0 0 3px #eee',
    borderColor: '#333',
    outline: 'none',
  },

  '& > a.active svg > *': {
    fill: '#fb1',
  },
})
