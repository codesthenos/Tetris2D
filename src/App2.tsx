function App () {
  const canvas = document.querySelector('canvas')
  if (!canvas) return
  const context = canvas.getContext('2d')
  const $score = document.querySelector('span')
  const $section = document.querySelector('section')
  
  const BLOCK_SIZE = 20
  const BOARD_WIDTH = 14
  const BOARD_HEIGHT = 30
  
  let score = 0
  
  canvas.width = BLOCK_SIZE * BOARD_WIDTH
  canvas.height = BLOCK_SIZE * BOARD_HEIGHT
  if (!context) return
  context.scale(BLOCK_SIZE, BLOCK_SIZE)
  
  const board: number[][] = []
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    const row = []
    for (let j = 0; j < BOARD_WIDTH; j++) {
      row.push(0)
    }
    board.push(row)
  }
  
  const piece = {
    position: { x: 5, y: 5 },
    shape: [
      [1, 1],
      [1, 1]
    ]
  }
  
  const SHAPES = [
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
  
  let dropCounter = 0
  let lastTime = 0
  
  function update (time = 0) {
    const deltaTime = time - lastTime
    lastTime = time
  
    dropCounter += deltaTime
  
    if (dropCounter > 1000) {
      piece.position.y++
      if (checkCollision()) {
        piece.position.y--
        solidifyPiece()
        removeRows()
      }
      dropCounter = 0
    }
  
    draw()
    window.requestAnimationFrame(update)
  }
  
  function draw () {
    if(!context || !canvas) return
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
  
    board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          context.fillStyle = 'yellow'
          context.fillRect(x, y, 1, 1)
        }
      })
    })
  
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          context.fillStyle = 'red'
          context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
        }
      })
    })
    if (!$score) return
    $score.innerText = `${score}`
  }
  
  function rightRotatePiece (pieceV: typeof piece) {
    const rotatedShape = []
  
    for (let y = 0; y < pieceV.shape[0].length; y++) {
      const newRow = []
      for (let x = pieceV.shape.length - 1; x >= 0; x--) {
        newRow.push(pieceV.shape[x][y])
      }
      rotatedShape.push(newRow)
    }
    pieceV.shape = rotatedShape
  }
  
  function leftRotatePiece (pieceV: typeof piece) {
    const rotatedShape = []
  
    for (let y = pieceV.shape[0].length - 1; y >= 0; y--) {
      const newRow = []
      for (let x = 0; x < pieceV.shape.length; x++) {
        newRow.push(pieceV.shape[x][y])
      }
      rotatedShape.push(newRow)
    }
    pieceV.shape = rotatedShape
  }
  
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      piece.position.x--
      if (checkCollision()) piece.position.x++
    }
  
    if (event.key === 'ArrowRight') {
      piece.position.x++
      if (checkCollision()) piece.position.x--
    }
  
    if (event.key === 'ArrowDown') {
      piece.position.y++
      if (checkCollision()) {
        piece.position.y--
        solidifyPiece()
        removeRows()
      }
    }
  
    if (event.key === 'ArrowUp') {
      rightRotatePiece(piece)
      if (checkCollision()) leftRotatePiece(piece)
    }
  
    if (event.key === ' ') {
      leftRotatePiece(piece)
      if (checkCollision()) rightRotatePiece(piece)
    }
  })
  
  function checkCollision () {
    return piece.shape.find((row, y) => {
      return row.find((value, x) => {
        return (
          value !== 0 &&
          board[y + piece.position.y]?.[x + piece.position.x] !== 0
        )
      })
    })
  }
  
  function solidifyPiece () {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) board[y + piece.position.y][x + piece.position.x] = 1
      })
    })
  
    piece.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    piece.position.x = 6
    piece.position.y = 0
    if (checkCollision()) {
      window.alert('GAME OVER')
      board.forEach((row) => row.fill(0))
    }
  }
  
  function removeRows () {
    const rowsToRemove: number[] = []
  
    board.forEach((row, y) => {
      if (row.every(value => value === 1)) {
        rowsToRemove.push(y)
      }
    })
  
    rowsToRemove.forEach(y => {
      board.splice(y, 1)
      const newRow = Array(BOARD_WIDTH).fill(0) as number[]
      board.unshift(newRow)
      score += 10
    })
  }
  if (!$section) return
  $section.addEventListener('click', () => {
    update()
  
    $section.remove()
  
    const audio = new window.Audio('./tetris-theme-korobeiniki.mp3')
    console.log(audio)
    audio.volume = 0.5
    void audio.play()
  })

  return (
    <></>
  )
}
export default App
