function TextEndGame ({ textEndGame }: { textEndGame: 'YOU WIN' | 'GAME OVER' | null }) {
  return (
    <>
      {textEndGame && <span className='endText'>{textEndGame}</span>}
    </>
  )
}
export default TextEndGame
