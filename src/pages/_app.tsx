import type { AppProps } from 'next/app'
import AppContextProvider from '../context/appContext'
import TeachContextProvider from '../context/TeachContext'
import '../styles/globals.css'

import { Amaranth } from '@next/font/google'

const amaranth = Amaranth({
  weight: '400',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={amaranth.className}>
      <AppContextProvider>
        <TeachContextProvider>
          <Component {...pageProps} />
        </TeachContextProvider>
      </AppContextProvider>
    </main>
  )
}

export default MyApp
