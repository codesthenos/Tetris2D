import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants'

function Canvas ({ canvasRef }: { canvasRef: React.MutableRefObject<HTMLCanvasElement | null> }) {
  return (
    <>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </>
  )
}
export default Canvas
