import { useState } from 'react'

interface ToggleProps {
  render(isOpen: boolean, onToggle: () => void): JSX.Element
}

export function Toggle({ render }: ToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

  function onToggle() {
    setIsOpen((state) => !state)
  }

  return render(isOpen, onToggle)
}
