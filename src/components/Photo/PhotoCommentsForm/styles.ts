import { styled } from '@/styles/stitches.config'

export const Form = styled('form', {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'stretch',
  margin: '1rem',
})

export const Textarea = styled('textarea', {
  display: 'block',
  width: '100%',
  fontSize: '1rem',
  fontFamily: '$--type-first',
  resize: 'none',
  border: '1px solid #eee',
  padding: '.5rem',
  borderRadius: '.2rem',
  background: '#eee',
  transition: '.2s',

  '&:focus, &:hover': {
    outline: 'none',
    borderColor: '#fb1',
    background: '#fff',
    boxShadow: '0 0 0 3px #fea',
  },
})

export const Button = styled('button', {
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  fontSize: '1rem',
  padding: '0 1rem',
  overflow: 'hidden',

  '&:focus, &:hover': {
    outline: 'none',
  },

  '&:focus > svg path, &:hover > svg path': {
    fill: '#fea',
    stroke: '#fb1',
  },
})
