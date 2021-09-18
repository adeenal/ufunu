import React from 'react'

import { default as RareUfunu, UfunuFile, UFUNU_FILES } from './RareUfunu'
import { useInterval } from './util'

const randomUfunu = () =>
  UFUNU_FILES[Math.floor(Math.random() * UFUNU_FILES.length)]

const INTERVAL_MS = 500

export interface Props {
  positionX: number
  positionY: number
}

const UfunuOverlay: React.FunctionComponent<Props> = ({ positionX, positionY }) => {
  const [filename, setFilename] = React.useState<UfunuFile>(randomUfunu())

  useInterval(() => {
    setFilename(randomUfunu())
  }, INTERVAL_MS)

  return (
    <div className='ufunu-overlay' style={{
      top: positionY,
      left: positionX,
    }}>
      <RareUfunu filename={filename} />
    </div>
  )
}

export default UfunuOverlay
