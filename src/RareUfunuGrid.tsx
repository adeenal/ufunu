import React from 'react'

import Cell from './Cell'
import { default as Letter, SupportedLetter } from './Letter'
import { default as RareUfunu, UFUNU_FILES } from './RareUfunu'
import { shuffleCopy, useInterval } from './util'

const INTERVAL_MS = 1000

type GridState = SupportedLetter
const GRID_STATES: readonly GridState[] = ['u', 'f', 'u', 'n']
const advance = (n: number) => (n + 1) % GRID_STATES.length

const shuffledUfunus = () => shuffleCopy(UFUNU_FILES)

const RareUfunuGrid: React.FunctionComponent = () => {
  const [ufunus, setUfunus] = React.useState(shuffledUfunus())
  const [gridStateIndex, setGridStateIndex] = React.useState(0)
  const gridState = (offset: number = 0) => GRID_STATES[(gridStateIndex + offset) % GRID_STATES.length]

  useInterval(() => {
    setUfunus(shuffledUfunus())
    setGridStateIndex(advance(gridStateIndex))
  }, INTERVAL_MS)

  return (
    <div className='rare-ufunu-grid'>
      {ufunus.map((filename, index) => (
        <React.Fragment key={filename}>
          {gridState() === 'u' && <Letter letter={gridState(index)} />}
          <Cell>
            <RareUfunu filename={filename} />
          </Cell>
          {(gridState() === 'f' || gridState() === 'n') && <Letter letter={gridState(index)} />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default RareUfunuGrid
