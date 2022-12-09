import type { AppProps } from 'next/app'
import AppContextProvider from '../context/appContext'
import TeachContextProvider from '../context/TeachContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <TeachContextProvider>
        <Component {...pageProps} />
      </TeachContextProvider>
    </AppContextProvider>
  )
}

export default MyApp
