import Player from '../components/Player'

const dict = [
  { start: 0, end: 2, pt: 'oi cara', en: 'hello dude' },
  {
    start: 2,
    end: 3,
    pt: 'eu não sei oque fazer',
    en: "i don't know what to do",
  },
]

interface Props {
  isStatic: boolean
}

export default function FullScreen({ isStatic }: Props) {
  return (
    <main className="w-screen h-screen bg-gray-800 flex flex-col justify-center items-center overflow-hidden absolute">
      <Player src="/cena.mp4" isStatic={isStatic} />
    </main>
  )
}
