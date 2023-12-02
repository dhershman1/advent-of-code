import getData from '../../utils/getData.js'

const dataSet = await getData()
const CONFIG = {
  RED: 12,
  GREEN: 13,
  BLUE: 14
}

function subdivideGameInfo (lines) {
  let sum = 0
  let powers = 0
  let sumPowers = 0
  for (const line of lines) {
    const splitLine = line.split(':')
    const id = Number(splitLine[0].trim().substring(5))
    const rounds = splitLine[1].split(';')
    let possible = true
    const reds = []
    const greens = []
    const blues = []

    for (let i = 0; i < rounds.length; i++) {
      const colorCountPairs = rounds[i].split(',')
      for (const pair of colorCountPairs) {
        const splitPair = pair.trim().split(' ')
        const count = Number(splitPair[0])
        const color = splitPair[1]
        if (color === 'red') {
          if (count > CONFIG.RED) {
            possible = false
          }
          reds.push(count)
        } else if (color === 'green') {
          if (count > CONFIG.GREEN) {
            possible = false
          }
          greens.push(count)
        } else if (color === 'blue') {
          if (count > CONFIG.BLUE) {
            possible = false
          }
          blues.push(count)
        }
      }
    }

    if (possible) {
      sum += id
    }

    const minReds = Math.max(...reds)
    const minGreens = Math.max(...greens)
    const minBlues = Math.max(...blues)

    powers = minReds * minGreens * minBlues
    sumPowers += powers
  }
  console.log(`sum of possible game ids: ${sum}`)
  console.log(`sum of powers for the minimums: ${sumPowers}`)
}

subdivideGameInfo(dataSet)
