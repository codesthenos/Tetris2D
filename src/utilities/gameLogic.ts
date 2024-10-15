import { BOX_HEIGHT, CANVAS_HEIGHT, CANVAS_WIDTH, INITIAL_BOX_X, MODE } from '../constants'
import type { box } from '../types'

function getColor () {
  const red = Math.floor(Math.random() * 255)
  const green = Math.floor(Math.random() * 255)
  const blue = Math.floor(Math.random() * 255)

  return `rgb(${red}, ${green}, ${blue})`
}

export function getWidth (boxesRef: box[], currentRef: number) {
  const currentBox = boxesRef[currentRef]

  if (currentRef === 0) return currentBox.width

  const previousBox = boxesRef[currentRef - 1]

  const overlapStart = Math.max(previousBox.x, currentBox.x)
  const overlapEnd = Math.min(previousBox.x + previousBox.width, currentBox.x + currentBox.width)
  
  return overlapEnd > overlapStart ? overlapEnd - overlapStart : 0
}

export function addBox (boxesRef: box[], currentRef: number) {
  const newBox = {
    x: INITIAL_BOX_X,
    y: boxesRef[currentRef].y + BOX_HEIGHT,
    width: getWidth(boxesRef, currentRef),
    color: getColor()
  }
  return newBox
}

export function manageDirection (speedRef: number, boxesRef: box[], currentRef: number) {
  if ((speedRef > 0 && boxesRef[currentRef].x > CANVAS_WIDTH - boxesRef[currentRef].width / 2) || (speedRef < 0 && boxesRef[currentRef].x < - boxesRef[currentRef].width / 2) ) {
    return -speedRef
  } else {
    return speedRef
  }
}

export function chooseMode (newBox: box, boxesRef: box[], currentRef: number) {
  if (newBox.width === 0) return MODE.GAMEOVER
  else {
    if (boxesRef[currentRef].y === CANVAS_HEIGHT) return MODE.WIN
  }
  return MODE.BOUNCE
}

export function chunkAndReplaceBox (boxesRef: box[], currentRef: number, newBox: box) {
  if (boxesRef.length > 1) {
    if (boxesRef[currentRef].x < boxesRef[currentRef - 1].x) {
      return { ...boxesRef[currentRef], x: boxesRef[currentRef - 1].x,  width: newBox.width }
    } else {
      return { ...boxesRef[currentRef],  width: newBox.width }
    }
  }
  return boxesRef[currentRef]
}
