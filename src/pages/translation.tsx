import { useContext } from 'react'
// import CanvasDraw from 'react-canvas-draw'
import { TeachContext } from '../context/TeachContext'

export default function Translation() {
  const { dict, teachIndex } = useContext(TeachContext)

  return (
    <section className="bg-black/50  h-screen w-full flex justify-center items-center absolute">
      <main className="flex flex-col gap-5 bg-slate-200 w-fit h-fit px-28 py-5 text-center rounded-3xl shadow-2xl">
        <h2 className="text-7xl z-40">{dict[teachIndex].pt}</h2>
        <h2 className="text-7xl z-40">{dict[teachIndex].en}</h2>
      </main>
      {/* <div className="absolute">
        <CanvasDraw
          lazyRadius={0}
          hideInterface={true}
          hideGrid={true}
          backgroundColor={'transparent'}
          canvasWidth={1800}
          canvasHeight={900}
          brushRadius={5}
        />
      </div> */}
      {/* <Canvas width={1800} height={900} /> */}
    </section>
  )
}
