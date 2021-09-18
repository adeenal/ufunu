import React from 'react';

import { default as UfunuOverlay, Props as UfunuOverlayProps } from './UfunuOverlay'
import { useThrottle } from './util'

const THROTTLE_MS = 50

const UfunuTrailLayer: React.FunctionComponent = () => {
  const [ufunuOverlays, setUfunuOverlays] = React.useState<React.ReactElement<UfunuOverlayProps>[]>([])

  const throttle = useThrottle(THROTTLE_MS)

  const addUfunuOverlay = React.useCallback((props: Omit<UfunuOverlayProps, 'filename'>) => {
    throttle(() => {
      setUfunuOverlays([...ufunuOverlays, (
        <UfunuOverlay {...props} key={`ufunu-overlay-${ufunuOverlays.length}`} />
      )])
    })
  }, [ufunuOverlays, setUfunuOverlays, throttle])

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
