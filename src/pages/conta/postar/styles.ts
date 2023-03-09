import { styled } from '@/styles/stitches.config'

export const UserPhotoPostContainer = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  marginBottom: '2rem',

  '& .file': {
    marginBottom: '1rem',
  },
})

export const FormPhotoPost = styled('form', {})

export const ImagePreview = styled('div', {
  borderRadius: '1rem',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',

  '&::after': {
    content: '',
    display: 'block',
    height: 0,
    paddingBottom: '100%',
  },
})
