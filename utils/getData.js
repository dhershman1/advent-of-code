import fs from 'node:fs/promises'

async function getData () {
  const data = await fs.readFile('./data.txt', {
    encoding: 'utf-8'
  })

  return data.split('\n')
}

export default getData
