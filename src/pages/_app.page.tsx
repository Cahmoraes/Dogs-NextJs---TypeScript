import type { AppProps } from 'next/app'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { globalStyles } from '@/styles/globalStyles'
import { UserProvider } from '@/contexts/UserContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  )
}
