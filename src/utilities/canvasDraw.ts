import { CANVAS_WIDTH, CANVAS_HEIGHT, BOX_HEIGHT, MODE } from '../constants.ts'
import type { box } from '../types.d.ts'

export function drawBackground ({ context, color }: { context: CanvasRenderingContext2D, color: string }) {
  context.fillStyle = color
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function drawBoxes ({ context, boxes }: { context: CanvasRenderingContext2D, boxes: box[] }) {
  boxes.forEach((box) => {
    const { x, y, width, color } = box
    const newY = CANVAS_HEIGHT - y
      
    context.fillStyle = color
    context.fillRect(x, newY, width, BOX_HEIGHT)
  })
}

function draw ({ context, boxes, mode, color }: { context: CanvasRenderingContext2D, boxes: box[], mode: MODE, color: string }) {
  if (mode === MODE.GAMEOVER) return

  drawBackground({ context, color })
  drawBoxes({ context, boxes })
}

export default draw
