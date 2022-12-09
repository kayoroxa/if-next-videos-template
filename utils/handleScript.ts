import { similarSounds } from '../data/similar-sounds'
import { yarnSentences } from '../data/yarn-sentences'

const dataSplitted = yarnSentences
  .split('\n\n')
  .filter(Boolean)
  .map(v => v.split('\n').filter(Boolean))

export const dataScript = dataSplitted

export function getOptions(sentence: string) {
  let sentencesOption = [sentence]

  for (const word of sentence.split(' ')) {
    const similarSound = similarSounds.find(v =>
      sentence.split(' ').some(w => v.includes(w.toLowerCase()))
    )
  }

  return similarSounds.find(v =>
    sentence.split(' ').some(w => v.includes(w.toLowerCase()))
  )
}
