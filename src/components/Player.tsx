import {
  RefObject,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { AppContext } from '../context/appContext'
import { TeachContext } from '../context/TeachContext'

interface IPlayer {
  _ref?: RefObject<HTMLVideoElement>
  src: string
  isStatic?: boolean
}

function VideoApi(vid: HTMLVideoElement | null) {
  const { teachIndex, setTeachIndex, dict } = useContext(TeachContext)
  const [time, setTime] = useState(0)
  const [curSrt, setCurSrt] = useState({ start: 0, end: 0, pt: '', en: '' })
  const [repeat, setRepeat] = useState(false)
  const { atualPage } = useContext(AppContext)

  useEffect(() => {
    if (repeat && vid) {
      vid.currentTime = curSrt.start
      vid.play()
      setRepeat(false)
    }
  }, [repeat, vid, curSrt.start])

  useEffect(() => {
    if (!vid) return
    if (atualPage !== 'scene') {
      vid.pause()
      return
    }

    setCurSrt({
      start: dict[teachIndex].start,
      end: dict[teachIndex].end,
      pt: dict[teachIndex].pt,
      en: dict[teachIndex].en,
    })

    if (vid.paused && vid.currentTime <= dict[teachIndex].start + 0.3) {
      vid.play()
    } else {
      vid.currentTime = dict[teachIndex].start
      vid.play()
    }
  }, [teachIndex, vid, dict, atualPage])

  return {
    nextTeach: () => {
      setTeachIndex(prev => Math.min(prev + 1, dict.length - 1))
    },
    prevTeach: () => {
      setTeachIndex(prev => Math.max(prev - 1, 0))
    },
    repeatTeach: () => {
      setRepeat(true)
    },
    time,
    setTime,
  }
}

const Player = ({ src, isStatic = false }: IPlayer) => {
  const { teachIndex, dict } = useContext(TeachContext)
  const video = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  const { prevTeach, nextTeach, repeatTeach, time, setTime } = VideoApi(
    video.current
  )

  useHotkeys('d', nextTeach)
  useHotkeys('a', prevTeach)
  useHotkeys('r', repeatTeach)

  function handleUpdate(e: SyntheticEvent<HTMLVideoElement>) {
    if (!e.currentTarget) return
    const currentTime = e.currentTarget.currentTime
    if (currentTime >= dict[teachIndex].end) {
      e.currentTarget.pause()
      setPaused(true)
    }
  }

  return (
    <main className="w-full h-full">
      {!isStatic && (
        <div className="absolute bottom-28 text-center flex flex-col gap-5 m-auto left-0 right-0 z-40">
          <div className="text-6xl text-white">{dict[teachIndex].pt}</div>
          <div className="text-6xl text-white">{dict[teachIndex].en}</div>
        </div>
      )}

      <div
        id="fade"
        className="bg-gradient-to-t from-black/50 w-full h-[40%] absolute bottom-0"
      ></div>

      <video
        width="100%"
        height="90%"
        className={`min-h-full min-w-full object-cover transition-all duration-100 `}
        muted
        autoPlay={!isStatic}
        ref={video}
        onTimeUpdate={handleUpdate}
      >
        <source src={src} type="video/mp4" />
      </video>
    </main>
  )
}

export default Player
