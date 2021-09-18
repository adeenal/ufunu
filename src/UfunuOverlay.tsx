import React from 'react'

import { default as RareUfunu, UfunuFile } from './RareUfunu'

export interface Props {
  positionX: number
  positionY: number
  filename: UfunuFile
}

const UfunuOverlay: React.FunctionComponent<Props> = ({ positionX, positionY, filename }) => (
  <div className='ufunu-overlay' style={{
    top: positionY,
    left: positionX,
  }}>
    <RareUfunu filename={filename} />
  </div>
)

export default UfunuOverlay
