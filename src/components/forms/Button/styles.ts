import { styled } from '@/styles/stitches.config'

export const ButtonContainer = styled('button', {
  fontSize: '1rem',
  fontFamily: '$--type-first',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '0.4rem',
  background: '#fb1',
  color: '#764701',
  padding: '.8rem 1.2rem',
  boxSizing: 'border-box',
  transition: '.1s',
  minWidth: '8rem',

  '&:hover, &:focus': {
    outline: 'none',
    boxShadow: '0 0 3px #fea, 0 0 0 4px #fb1',
  },

  '&:disabled': {
    opacity: '0.5',
    cursor: 'wait',
  },
})
