import getData from '../../../utils/getData.js'

const dataSet = await getData()

const parse = (lines, scale) => {
  const rowMap = {}
  const columnExpansions = {}
  const galaxies = []
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row]
    const matches = [...line.matchAll(/#/g)]
    if (matches.length === 0) { rowMap[row] = true } else {
      for (const match of matches) {
        columnExpansions[match.index] = 0
        galaxies.push({
          row: row + Object.keys(rowMap).length * (scale - 1),
          col: match.index
        })
      }
    }
  }
  let counter = 0
  const numberOfColumns = lines[0].length
  for (let i = 0; i < numberOfColumns; i++) {
    if (columnExpansions[i] === undefined) { counter += scale - 1 } else { columnExpansions[i] = counter }
  }
  for (const galaxy of galaxies) { galaxy.col += columnExpansions[galaxy.col] }
  return galaxies
}
const taxicab = (p1, p2) => {
  return Math.abs(p1.row - p2.row) + Math.abs(p1.col - p2.col)
}

const solvePart1 = (input, scale = 2) => {
  const galaxies = parse(input, scale)
  let sum = 0
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i; j < galaxies.length; j++) {
      sum += taxicab(galaxies[i], galaxies[j])
    }
  }
  return sum
}

const solvePart2 = (input) => {
  return solvePart1(input, 1_000_000)
}

console.log(solvePart1(dataSet))
console.log(solvePart2(dataSet))
