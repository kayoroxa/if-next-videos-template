import { motion } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'

interface IProps {
  data: string[][]
}

function AppScreen({ className, ...props }: any) {
  return (
    <section
      className={
        'w-screen h-screen flex justify-center items-center gap-[90px] overflow-hidden bg-gray-800 ' +
          className || ''
      }
      {...props}
    />
  )
}

export default function Home({ data }: IProps) {
  const [indexTeach, setIndexTeach] = useState(0)
  const [indexInTeach, setIndexInTeach] = useState(0)

  const videoSelected = useRef<HTMLVideoElement>(null)

  useHotkeys('enter', () => {
    setIndexTeach(p => (p + 1 <= data.length ? p + 1 : 0))
  })
  useHotkeys('p', () => {
    videoSelected.current?.play()
  })

  return (
    <AppScreen>
      {data.map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: 0,
            opacity: indexTeach == index + 1 || indexTeach === 0 ? 1 : 0.2,
            scale: indexTeach == index + 1 ? 1.2 : 0.8,
          }}
          initial={{ opacity: 0.1, scale: 0.1 }}
          transition={{ duration: 0.9, type: 'spring' }}
          className="w-[300px] h-[420px] cursor-pointer group perspective"
        >
          <div className="relative w-full preserve-3d group-hover:rotate-y-180 h-full duration-1000 flex ">
            <figure className="p-5 text-center absolute backface-hidden border-4 rounded-xl w-full h-full flex flex-col gap-6 items-center justify-center bg-cyan-600">
              <section className="h-[49%] bg-white rounded-3xl overflow-hidden">
                <video
                  className="w-full h-full min-w-full min-h-full object-cover"
                  ref={indexTeach == index + 1 ? videoSelected : undefined}
                >
                  <source
                    src="https://y.yarn.co/772c459d-8b71-42a0-830b-52b9430cdd9a.mp4"
                    type="video/mp4"
                  />
                </video>
              </section>
              <p className="text-6xl">{data[index][0].split('=')[0]}</p>
            </figure>
            <figure className="p-5 text-center absolute backface-hidden border-4 rounded-xl w-full h-full flex flex-col gap-6 items-center justify-center rotate-y-180 bg-red-600">
              <p className="text-6xl">{data[index][0].split('=')[1]}</p>
            </figure>
          </div>
        </motion.div>
      ))}
    </AppScreen>
  )
}

import * as fs from 'fs'
import { useRef, useState } from 'react'

export async function getServerSideProps() {
  const text = await fs.readFileSync('./public/script.txt', {
    encoding: 'utf8',
  })

  return {
    props: {
      data: text
        .split(/(\r\n){2,}/g)
        .filter(v => v !== '\r\n' && v !== '')
        .map(v => v.split('\r\n')),
    },
  }
}
