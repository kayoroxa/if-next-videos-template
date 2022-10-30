import { useContext } from 'react'
import Player from '../components/Player'
import { TeachContext } from '../context/TeachContext'

const dict = [
  { start: 0, end: 2, pt: 'oi cara', en: 'hello dude' },
  {
    start: 2,
    end: 3,
    pt: 'eu não sei oque fazer',
    en: "i don't know what to do",
  },
]

export default function FullScreen() {
  const { teachIndex } = useContext(TeachContext)

  return (
    <main className="w-screen h-screen bg-gray-800 flex flex-col justify-center items-center overflow-hidden">
      <Player src="/cena.mp4" />
    </main>
  )
}
