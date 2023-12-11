import getData from '../../../utils/getData.js'

const dataSet = await getData()

function findStartingPoint (grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 'S') {
        return { x: col, y: row }
      }
    }
  }
  return null // Return null if 'S' is not found.
}

function findLoopSteps (lines, part) {
  const start = findStartingPoint(lines)
  let { x, y } = start
  let dir = null
  const isLoop = lines.map(() => [])
  const below = lines[y + 1][x]

  if (below === '|' || below === 'L' || below === 'J') {
    dir = 'S'
    y++
  }

  if (!dir) {
    const above = lines[y - 1][x]
    if (above === '|' || above === 'F' || above === '7') {
      dir = 'N'
      y--
    }
  }

  if (!dir) {
    // Only possible starting shape left is -, so pick E or W
    dir = 'E'
    x++
  }

  const path = [start, { x, y }]
  isLoop[start.y][start.x] = true
  isLoop[y][x] = true
  let steps = 1

  while (x !== start.x || y !== start.y) {
    let deltaX = 0
    let deltaY = 0

    switch (lines[y][x] + dir) {
      case '|S':
        deltaY = 1
        break
      case '|N':
        deltaY = -1
        break
      case '-E':
        deltaX = 1
        break
      case '-W':
        deltaX = -1
        break
      case 'LS':
        deltaX = 1
        break
      case 'LW':
        deltaY = -1
        break
      case 'JS':
        deltaX = -1
        break
      case 'JE':
        deltaY = -1
        break
      case '7N':
        deltaX = -1
        break
      case '7E':
        deltaY = 1
        break
      case 'FN':
        deltaX = 1
        break
      case 'FW':
        deltaY = 1
        break
      default:
        throw new Error('unrecognized ' + lines[y][x] + dir)
    }

    if (deltaY === 1) {
      dir = 'S'
    } else if (deltaY === -1) {
      dir = 'N'
    } else if (deltaX === -1) {
      dir = 'W'
    } else {
      dir = 'E'
    }

    x += deltaX
    y += deltaY
    isLoop[y] = isLoop[y] || []
    isLoop[y][x] = true
    steps++
    path.push({ x, y })
  }

  if (part === 1) {
    return steps / 2
  }

  let count = 0
  for (let yy = 0; yy < lines.length; yy++) {
    let crosses = 0
    const line = lines[yy]
    let corner = false
    for (let xx = 0; xx < line.length; xx++) {
      if (isLoop[yy][xx]) {
        const current = lines[yy][xx]
        if (current === '|') {
          crosses++
        } else if (current !== '-') {
          if (corner) {
            if (corner === 'L' && current === '7') {
              crosses++
            } else if (corner === 'F' && current === 'J') {
              crosses++
            }
            corner = false
          } else {
            corner = current
          }
        }
      } else if (crosses % 2 === 1) {
        count++
      }
    }
  }

  return count
}

console.log(findLoopSteps(dataSet, 1))
console.log(findLoopSteps(dataSet, 2))
