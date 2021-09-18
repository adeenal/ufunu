import React from 'react';

import { UFUNU_FILES } from './RareUfunu'
import { default as UfunuOverlay, Props as UfunuOverlayProps } from './UfunuOverlay'
import { useThrottle } from './util'

const randomUfunu = () =>
  UFUNU_FILES[Math.floor(Math.random() * UFUNU_FILES.length)]

const UfunuTrailLayer: React.FunctionComponent = () => {
  const [ufunuOverlays, setUfunuOverlays] = React.useState<React.ReactElement<UfunuOverlayProps>[]>([])

const addOverlayThrottle = useThrottle(50)

const addUfunuOverlay = React.useCallback((props: Omit<UfunuOverlayProps, 'filename'>) => {
  addOverlayThrottle(() => {
    setUfunuOverlays([...ufunuOverlays, (
      <UfunuOverlay {...props} filename={randomUfunu()} key={`ufunu-overlay-${ufunuOverlays.length}`} />
    )])
  })
}, [ufunuOverlays, setUfunuOverlays, addOverlayThrottle])

  const onMouseMove: React.MouseEventHandler = React.useCallback(event => {
    addUfunuOverlay({
      positionX: event.clientX,
      positionY: event.clientY,
    })
  }, [addUfunuOverlay])

  const onTouchMove: React.TouchEventHandler = React.useCallback(({ targetTouches }) => {
    for (let i = 0; i < targetTouches.length; i++) {
      const touch = targetTouches.item(i)
      addUfunuOverlay({
        positionX: touch.clientX,
        positionY: touch.clientY,
      })
    }
  }, [addUfunuOverlay])

  return (
    <div className='ufunu-trail-layer' onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
      {ufunuOverlays}
    </div>
  )
}

export default UfunuTrailLayer
