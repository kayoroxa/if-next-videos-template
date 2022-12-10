import { RefObject, useMemo, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { dataScript, getOptions } from '../../utils/handleScript'

function Yarn({
  link,
  videoRef,
}: {
  link: string
  videoRef: RefObject<HTMLVideoElement>
}) {
  return (
    <section className="text-center">
      <main className="w-[60vw] h-[60vh] overflow-hidden rounded-xl relative">
        <video
          ref={videoRef}
          src={link}
          className=" w-full h-full min-w-full min-h-full object-cover z-10"
        />
        {/* <p className="absolute top-0 bottom-0 left-0 right-0 m-auto h-fit text-2xl -z-10">
          Escute...
        </p> */}
      </main>
      <div>{link}</div>
    </section>
  )
}

function Quiz({ options }: { options: string[] }) {
  return (
    <div className="text-black text-6xl flex flex-col gap-11">
      {options.map((o, i) => {
        return (
          <div key={o} className="flex items-center">
            <div className="bg-blue-300 px-5 h-full flex justify-center  rounded-l-lg items-center shadow-md">
              {i + 1}
            </div>
            <div className="bg-zinc-100 py-3 px-5 rounded-r-lg shadow-md">
              {o}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function CTSQuiz() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState<'listing' | 'quiz' | 'answer' | 'meaning'>(
    'listing'
  )
  // const [options, setOptions] = useState(getOptions(dataScript[index][1]))

  // useEffect(() => {
  //   setOptions(getOptions(dataScript[index][1]))
  // }, [index])

  const options = useMemo(() => getOptions(dataScript[index][1]), [index])

  const videoRef = useRef<HTMLVideoElement>(null)

  useHotkeys('d', () => {
    setIndex(prev => {
      // console.log({ dataScript })
      // debugger
      return Math.min(dataScript.length - 1, prev + 1)
    })
  })

  useHotkeys('a', () => {
    setIndex(prev => Math.max(0, prev - 1))
  })
  useHotkeys('f', () => {
    if (videoRef?.current) {
      videoRef.current.play()
    }
  })

  useHotkeys('1', () => {
    setStep('listing')
  })

  useHotkeys('2', () => {
    setStep('quiz')
  })

  return (
    <div className="w-full h-screen bg-blue-200 flex flex-col items-center justify-center">
      {step === 'listing' && (
        <Yarn link={dataScript[index][0]} videoRef={videoRef} />
      )}
      {step === 'quiz' && <Quiz options={options} />}
    </div>
  )
}
