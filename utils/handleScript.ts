import { sample, sampleSize } from 'lodash'
import { similarSounds } from '../data/similar-sounds'
import { yarnSentences } from '../data/yarn-sentences'

const dataSplitted = yarnSentences
  .split('\n\n')
  .filter(Boolean)
  .map(v => v.split('\n').filter(Boolean))

export const dataScript = dataSplitted

type Dict = {
  [key: string]: string[]
}

export function getOptions(sentence: string) {
  let sentencesOption = [sentence]

  const allWords = sentence.match(/[’'a-zA-Z]+/gi)

  for (let c = 1; c <= 50; c++) {
    const selectWords = sampleSize(allWords, 3)

    const newSentence = selectWords.reduce((acc, word) => {
      const re = new RegExp(`\\b${word}\\b`, 'i')
      const row = similarSounds.find(row => row.some(option => re.test(option)))

      if (!row) return acc

      const newWord = sample(row)

      return acc.replace(new RegExp(`\\b${word}\\b`, 'gi'), newWord || word)
    }, sentence)

    if (
      !sentencesOption
        .map(v => v.toLowerCase())
        .includes(newSentence.toLowerCase())
    )
      sentencesOption.push(newSentence)
  }

  console.log(sentencesOption.slice(0, 3).join('\n'))

  return sentencesOption
}
