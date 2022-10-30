import type { AppProps } from 'next/app'
import TeachContextProvider from '../context/TeachContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TeachContextProvider>
      <Component {...pageProps} />
    </TeachContextProvider>
  )
}

export default MyApp
