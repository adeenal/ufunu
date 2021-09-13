import React from 'react'

import { default as Letter, SupportedLetter } from './Letter'
import { default as RareUfunu, UFUNU_FILES } from './RareUfunu'
import { shuffleCopy, useInterval } from './util'

const INTERVAL_MS = 1000

type GridState = SupportedLetter
const GRID_STATES: readonly GridState[] = ['u', 'f', 'u', 'n']
const nextGridStateIndex = (n: number) => (n + 1) % GRID_STATES.length

const shuffledUfunus = () => shuffleCopy(UFUNU_FILES)

const RareUfunuGrid: React.FunctionComponent = () => {
  const [ufunus, setUfunus] = React.useState(shuffledUfunus())
  const [gridStateIndex, setGridStateIndex] = React.useState(0)
  const gridState = GRID_STATES[gridStateIndex]

  useInterval(() => {
    setUfunus(shuffledUfunus())
    setGridStateIndex(nextGridStateIndex(gridStateIndex))
  }, INTERVAL_MS)

  return (
    <div className='rare-ufunu-grid'>
      {ufunus.map((filename) => (
        <React.Fragment key={filename}>
          {gridState === 'u' && <Letter letter={gridState} />}
          <RareUfunu filename={filename} key={filename} />
          {(gridState === 'f' || gridState === 'n') && <Letter letter={gridState} />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default RareUfunuGrid
