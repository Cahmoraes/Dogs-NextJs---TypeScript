import { styled } from '@/styles/stitches.config'

export const InputContainer = styled('div', {
  marginBottom: '1rem',
})

export const Label = styled('label', {
  display: 'block',
  fontSize: '1rem',
  lineHeight: '1rem',
  paddingBottom: '0.5rem',
})

export const StyledInput = styled('input', {
  border: '1px solid #eee',
  display: 'block',
  width: '100%',
  fontSize: '1rem',
  padding: '0.8rem',
  borderRadius: '.4rem',
  background: '#eee',
  transition: '0.2s',

  '&:focus, &:hover': {
    outline: 'none',
    borderColor: '#fb1',
    background: '#fff',
    boxShadow: '0 0 0 3px #fea',
  },
})

export const ErrorMessage = styled('p', {
  color: '#f31',
  fontSize: '.875rem',
  marginTop: '.25rem',
})
