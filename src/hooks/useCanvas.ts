import { useEffect, useRef, useState } from 'react'
import type { box } from '../types'
import { BACKGROUD_COLOR, GAMEOVER_COLOR, WIN_COLOR, INITIAL_BOX, INITIAL_X_SPEED, MODE } from '../constants.ts'
import { addBox, chooseMode, chunkAndReplaceBox, manageDirection } from '../utilities/gameLogic.ts'
import { drawBackground } from '../utilities/canvasDraw.ts'

function useCanvas (draw: ({ context, boxes, mode, color }: { context: CanvasRenderingContext2D, boxes: box[], mode: MODE, color: string }) => void) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [textEndGame, settextEndGame] = useState<'YOU WIN' | 'GAME OVER' | null>(null)

  const frameIdRef = useRef(0)
  const speedRef = useRef(INITIAL_X_SPEED)
  const boxesRef = useRef<box[]>([INITIAL_BOX])
  const modeRef = useRef<MODE>(MODE.BOUNCE)
  const currentRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')

    function gameloop () {
      if (!context) return

      if (modeRef.current === MODE.BOUNCE) {
        speedRef.current = manageDirection(speedRef.current, boxesRef.current, currentRef.current)
        boxesRef.current[currentRef.current].x += speedRef.current

      } else if (modeRef.current === MODE.STOP) {
        const newBox = addBox(boxesRef.current, currentRef.current)
        modeRef.current = chooseMode(newBox, boxesRef.current, currentRef.current)
        boxesRef.current[currentRef.current] = chunkAndReplaceBox(boxesRef.current, currentRef.current, newBox)
        boxesRef.current = [...boxesRef.current, newBox]
        currentRef.current++
        speedRef.current += speedRef.current > 0 ? 1 : -1
        if (modeRef.current === MODE.BOUNCE) setScore(prev => prev + currentRef.current * 10)

      } else if (modeRef.current === MODE.GAMEOVER) {
        drawBackground({ context, color: GAMEOVER_COLOR })
        settextEndGame('GAME OVER')
        return

      } else if (modeRef.current === MODE.WIN) {
        drawBackground({ context, color: WIN_COLOR })
        setScore(9999)
        settextEndGame('YOU WIN')
        return
      }

      draw({ context, boxes: boxesRef.current, mode: modeRef.current, color: BACKGROUD_COLOR })
      /*With this we can see when the gameloop stops rerenders
      console.log(frameIdRef)
      */
      frameIdRef.current = window.requestAnimationFrame(gameloop)
    }
    gameloop()
    
    function handleInput () {
      if (modeRef.current === MODE.BOUNCE) modeRef.current = MODE.STOP
      else if (modeRef.current === MODE.GAMEOVER || MODE.WIN) {
        speedRef.current = INITIAL_X_SPEED
        boxesRef.current = [INITIAL_BOX]
        modeRef.current = MODE.BOUNCE
        currentRef.current = 0
        setScore(0)
        settextEndGame(null)
        gameloop()
      }
    }

    canvas.addEventListener('pointerdown', handleInput)
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        handleInput()
      }
    })
    
    return () => {
      canvas.removeEventListener('pointerdown', handleInput)
      document.removeEventListener('keydown', handleInput)
      window.cancelAnimationFrame(frameIdRef.current)
    }
  }, [draw])

  return { canvasRef, score, textEndGame }
}
export default useCanvas
