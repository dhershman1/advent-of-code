import getData from '../../utils/getData.js'

const dataSet = await getData()

const resultOne = dataSet.reduce((acc, line, idx) => {
  for (const match of line.matchAll(/\d+/g)) {
    let eligible = (match.index > 0 && line[match.index - 1] !== '.') || (match.index + match[0].length < line.length && line[match.index + match[0].length] !== '.')

    for (const y of [idx - 1, idx + 1]) {
      if (y > 0 && y < dataSet.length) {
        for (let x = match.index - 1; x <= match.index + match[0].length; x++) {
          if (x > 0 && x < line.length) {
            eligible ||= dataSet[y][x] !== '.'
          }
        }
      }
    }

    if (eligible) {
      acc += Number(match[0])
    }
  }

  return acc
}, 0)

const resultTwo = dataSet.reduce((acc, line, idx) => {
  for (const match of line.matchAll(/\d+/g)) {
    let star = null

    if (line[match.index - 1] === '*') {
      star = `${idx} ${match.index - 1}`
    }

    if (match.index + match[0].length < line.length && line[match.index + match[0].length] === '*') {
      star = `${idx} ${match.index + match[0].length}`
    }

    for (const y of [idx - 1, idx + 1]) {
      if (y > 0 && y < dataSet.length) {
        for (let x = match.index - 1; x <= match.index + match[0].length; x++) {
          if (x > 0 && x < line.length) {
            if (dataSet[y][x] === '*') {
              star = `${y} ${x}`
            }
          }
        }
      }
    }

    if (star) {
      acc[star] ??= []
      acc[star].push(Number(match[0]))
    }
  }

  return acc
}, {})

console.log(resultOne)
console.log(Object.values(resultTwo).filter((neighbours) => neighbours.length === 2).reduce((acc, neighbours) => acc + neighbours[0] * neighbours[1], 0))
