import React from 'react'

export default function FinishScreen({ point, maxPossiblePoints,dispatch }) {
  const percentage = (point / maxPossiblePoints) * 100;
  return (
    <>
      <p className='result'>
        You scored <strong>{point}</strong> out of {maxPossiblePoints}
        ({Math.ceil(percentage)}%)
      </p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'Restart' })}>
        Restart Quiz
      </button>
    </>
  )
}
