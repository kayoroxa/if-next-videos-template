import classes from 'classnames'
import { random } from 'lodash'
import { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const script = `
  how has (your|his|her) (day|week|year|night) been
  how has (your mother|your dad) (day|week|year|night) been
`
  .split('\n')
  .filter(Boolean)
  .map(line =>
    line
      .trim()
      .split(/[()]/g)
      .filter(v => v.trim().length > 0)
      .map(v => {
        v = v.trim()
        if (v.includes('|')) return [...v.split('|'), 0]
        else return v
      })
  )

function GetElement({ block }: { block: string | (string | number)[] }) {
  const hasOption = typeof block !== 'string'
  if (hasOption) {
    const activeIndex = Number(block.slice(-1)[0])
    const yAixes = 88 * activeIndex + 3

    const styles = {
      transform: `translate(0px, -${yAixes}px)`,
    }
    return (
      <div
        style={styles}
        className={`flex flex-col gap-6 -mt-[8px] transition-all text-zinc-900`}
      >
        {/* <div className="absolute top-0">a</div>                                                                                                      */}
        {block.slice(0, -1).map((option, i) => (
          <div
            className={classes(
              //
              'bg-white px-6 py-2 rounded-3xl',
              { 'opacity-40': i !== activeIndex }
            )}
            key={option}
          >
            {option}
          </div>
        ))}
      </div>
    )
    return (
      <div className="bg-white px-6 py-2 rounded-3xl ">
        {block.slice(0, -1)[0]}
      </div>
    ) //.map(option => <div key={option}>{option}</div>)
  }
  return <div>{block}</div>
}

export default function PatternDemo() {
  const [indexSentence, setIndexSentence] = useState(0)
  const [sentenceData, setSentenceData] = useState(script[0])

  useHotkeys('d', () => {
    setIndexSentence(prev => Math.min(prev + 1, script.length - 1))
  })
  useHotkeys('a', () => {
    setIndexSentence(prev => Math.max(0, prev - 1))
  })

  useEffect(() => {
    setSentenceData(script[indexSentence])
  }, [indexSentence])

  useHotkeys('enter', () => {
    setSentenceData(prev => {
      const newPrev = prev.map(v => {
        if (Array.isArray(v)) {
          v.pop()
          const indexRandom = random(0, v.length - 1, false)
          v.push(indexRandom)
          return v
        }
        return v
      })
      return newPrev
    })
  })

  return (
    <div className="flex justify-center items-center gap-6 text-5xl text-center h-screen w-full bg-slate-300 ">
      <span>...</span>
      <main className="bg-blue-400/80 flex gap-7 justify-center px-12 py-5 rounded-2xl h-[80px] overflow relative text-blue-50 font-bold">
        {sentenceData.map((block, i) => (
          <GetElement block={block} key={i} />
        ))}
      </main>
      <span>...</span>
    </div>
  )
}
