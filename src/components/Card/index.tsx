import {
  createContext,
  useState,
  cloneElement,
  ReactNode,
  useContext,
  ReactElement,
} from 'react'

interface CardRootContextData {
  open(): void
  close(): void
  isOpen: boolean
}

export const CardRootContext = createContext({} as CardRootContextData)

interface CardRootProps {
  children: ReactNode
}

export function Card({ children }: CardRootProps) {
  const [isOpen, setIsOpen] = useState(true)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <CardRootContext.Provider value={{ open, close, isOpen }}>
      <div className="card">{children}</div>
    </CardRootContext.Provider>
  )
}

interface CardContentProps {
  children?: ReactNode
}

export function CardContent({ children }: CardContentProps) {
  return <>{children}</>
}

interface CardButtonOpenProps {
  children: ReactElement
}

export function CardButtonOpen({ children }: CardButtonOpenProps) {
  const { isOpen, close } = useContext(CardRootContext)
  return isOpen ? cloneElement(children, { onClick: close }) : null
}

export function CardButtonClose({ children }: CardButtonOpenProps) {
  const { isOpen, open } = useContext(CardRootContext)
  return !isOpen ? cloneElement(children, { onClick: open }) : null
}

Card.Content = CardContent
Card.Open = CardButtonOpen
Card.Close = CardButtonClose
