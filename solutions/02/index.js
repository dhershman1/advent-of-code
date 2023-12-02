import getData from '../../utils/getData.js'

const dataSet = await getData()
const CONFIG = {
  red: 12,
  green: 13,
  blue: 14
}

function divideGameInfo (lines) {
  let sum = 0
  let sumPowers = 0
  for (const line of lines) {
    const splitLine = line.split(':')
    const id = Number(splitLine[0].substring(5))
    const rounds = splitLine[1].split(';')
    let possible = true
    const colors = {
      red: [],
      green: [],
      blue: []
    }

    for (let i = 0; i < rounds.length; i++) {
      const colorCountPairs = rounds[i].split(',')
      for (const pair of colorCountPairs) {
        const splitPair = pair.trim().split(' ')
        const count = Number(splitPair[0])
        const color = splitPair[1]
        if (count > CONFIG[color]) {
          possible = false
        }

        colors[color].push(count)
      }
    }

    if (possible) {
      sum += id
    }

    const minReds = Math.max(...colors.red)
    const minGreens = Math.max(...colors.green)
    const minBlues = Math.max(...colors.blue)

    sumPowers += minReds * minGreens * minBlues
  }
  console.log(`sum of possible game ids: ${sum}`)
  console.log(`sum of powers for the minimums: ${sumPowers}`)
}

divideGameInfo(dataSet)
