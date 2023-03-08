import { createStitches } from '@stitches/react'
export type { CSSProperties } from '@stitches/react'

export const { getCssText, globalCss, styled, keyframes, css } = createStitches(
  {
    theme: {
      fonts: {
        '--type-first': 'Helvetica, Arial, sans-serif',
        '--type-second': 'Spectral, Georgia',
      },
    },
  },
)
