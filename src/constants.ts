export const CANVAS_HEIGHT = 800
export const CANVAS_WIDTH = 400

export const GRAVITY = 1

export const BACKGROUD_COLOR = '#e3bb56'
export const GAMEOVER_COLOR = 'red'
export const WIN_COLOR = 'green'

export enum MODE {
  STOP = 'stop',
  BOUNCE = 'bounce',
  GAMEOVER = 'gameover',
  WIN = 'win'
}

export const SHAPES = [
  [
    [1, 1, 1, 1]
  ],
  [
    [1, 0, 0],
    [1, 1, 1]
  ],
  [
    [0, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 1],
    [1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ]
]
