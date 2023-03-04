import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorMessage, InputContainer, Label, StyledInput } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, ...rest }: InputProps,
  ref,
) => {
  return (
    <InputContainer>
      <Label htmlFor={rest.name}>{label}</Label>
      <StyledInput ref={ref} {...rest} />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </InputContainer>
  )
}

export const Input = forwardRef(InputComponent)
