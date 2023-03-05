import { ReactNode } from 'react'

interface ObjectCompositionProps {
  children?: ReactNode
}

interface ObjectCompositionRootProps extends ObjectCompositionProps {}

function ObjectCompositionRoot({ children }: ObjectCompositionRootProps) {
  return <section>{children}</section>
}

interface ObjectCompositionHeaderProps extends ObjectCompositionProps {}

function ObjectCompositionHeader({ children }: ObjectCompositionHeaderProps) {
  return <header>{children}</header>
}

interface ObjectCompositionBodyProps extends ObjectCompositionProps {}

function ObjectCompositionBody({ children }: ObjectCompositionBodyProps) {
  return <div>{children}</div>
}

interface ObjectCompositionFooterProps extends ObjectCompositionProps {}

function ObjectCompositionFooter({ children }: ObjectCompositionFooterProps) {
  return <footer>{children}</footer>
}

export const ObjectComposition = {
  Root: ObjectCompositionRoot,
  Header: ObjectCompositionHeader,
  Body: ObjectCompositionBody,
  Footer: ObjectCompositionFooter,
}
