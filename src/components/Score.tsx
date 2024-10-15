function Score ({ score }: { score: number }) {
  return (
    <>
      {score > 0 && <span>Score: {score}</span>}
    </>
  )
}
export default Score
