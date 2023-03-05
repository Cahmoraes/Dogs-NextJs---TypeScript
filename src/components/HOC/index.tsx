interface HocProps {
  background: string
}

export function Hoc({ background }: HocProps) {
  return <div style={{ background }}>Conteúdo</div>
}

export function HOCWithBackgroundRed() {
  return <Hoc background="red" />
}

export function HOCWithBackgroundBlue() {
  return <Hoc background="blue" />
}

export function HOCWithBackgroundGreen() {
  return <Hoc background="green" />
}
