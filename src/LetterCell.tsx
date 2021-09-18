import React from 'react'

import Cell from './Cell'

export type SupportedLetter = 'u' | 'f' | 'n'

interface Props {
  letter: SupportedLetter
}

const LetterCell: React.FunctionComponent<Props> = ({ letter }) =>
  <Cell>
    <p className='letter'>{letter}</p>
  </Cell>

export default LetterCell
