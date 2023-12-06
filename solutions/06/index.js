import getData from '../../utils/getData.js'
import { product } from 'kyanite'

const dataSet = await getData()

function formatData (part, data) {
  return data.map(line => (part === 1 ? line : line.replaceAll(/\s+/g, '')))
    .map(line => line.match(/\d+/g).map(n => Number(n)))
}

function partOne (data) {
  const [times, distances] = formatData(1, data)

  const wins = times.map((duration, i) => {
    const record = distances[i]
    let raceWins = 0

    for (let j = 0; j < duration; j++) {
      if ((duration - j) * j > record) {
        raceWins++
      }
    }

    return raceWins
  })

  return product(wins)
}

function partTwo (data) {
  const [duration, record] = formatData(2, data)
  let wins = 0

  for (let i = 0; i < duration; i++) {
    if ((duration - i) * i > record) wins++
  }

  return wins
}

console.log(partOne(dataSet))
console.log(partTwo(dataSet))
